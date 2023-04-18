import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useState } from 'react';

import { ProductCartType } from '../../models/cart';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions, selectors } from '../../redux/reducer';
import { addProductCart, updateCartQuantity } from '../../services/cart';
import { productCheck } from '../../services/payment';

type CartType = { isAvailable?: boolean } & ProductCartType;

const useCart = () => {
  const userCart = useAppSelector(selectors.user.selectUserCart);
  const cartTotal = useAppSelector(selectors.user.selectCartTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartType[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const toast = useToast();

  const checkCart = useCallback(async () => {
    try {
      if (cart.length < 1) setIsLoading(true);
      const cartReq = userCart.map(async (item) => {
        const req: CartType = {
          ...item,
          isAvailable: false,
        };

        try {
          const isAvailable = await productCheck(req.product_id, req.quantity);

          req.isAvailable = isAvailable.success;
        } catch (err) {
          req.isAvailable = false;
        }

        return req;
      });
      const newCart = await Promise.all(cartReq);

      setCart(newCart);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [cart.length, userCart]);

  const handleAddProduct = async (
    product: ProductCartType,
    onDone?: () => void
  ) => {
    try {
      const productCart = userCart.find(
        (item) =>
          item.product_id === product.product_id && item.color === product.color
      );
      if (productCart) {
        const data = await updateCartQuantity({
          product_id: product.product_id,
          quantity: product.quantity + productCart.quantity,
          color: product.color,
        });
        dispatch(actions.user.setUserCart(data.cart));
        dispatch(actions.user.setUserCartTotal(data.cart_total));
      } else {
        const newCart = await addProductCart({
          product_id: product.product_id,
          quantity: product.quantity,
          color: product.color,
        });
        dispatch(actions.user.setUserCart(newCart));
        dispatch(
          actions.user.setUserCartTotal(
            cartTotal + product.quantity * product.price
          )
        );
      }
      onDone?.();
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  };

  return {
    isLoading,
    cart,
    checkCart,
    handleAddProduct,
  };
};

export default useCart;
