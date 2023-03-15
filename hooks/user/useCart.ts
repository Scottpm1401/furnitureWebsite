import React, { useCallback, useEffect, useState } from 'react';

import { ProductCartType } from '../../models/cart';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions, selectors } from '../../redux/reducer';
import { addProductCart, updateCartQuantity } from '../../services/cart';
import { productCheck } from '../../services/payment';

type CartType = { isAvailable?: boolean } & ProductCartType;

const useCart = () => {
  const userCart = useAppSelector(selectors.user.selectUserCart);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartType[]>([]);
  const dispatch = useAppDispatch();

  const checkCart = useCallback(async () => {
    setIsLoading(true);
    const cartReq = userCart.map(async (item) => {
      const req: CartType = {
        ...item,
      };
      try {
        req.isAvailable = (
          await productCheck(req.product_id, req.quantity)
        ).success;
      } catch (error) {
        req.isAvailable = false;
      }

      return req;
    });
    const newCart = await Promise.all(cartReq);
    setCart(newCart);

    setIsLoading(false);
  }, [userCart]);

  const handleAddProduct = async (
    product: ProductCartType,
    onDone?: () => void
  ) => {
    try {
      const isExistInCart =
        userCart.findIndex(
          (item) =>
            item.product_id === product.product_id &&
            item.color === product.color
        ) > -1;
      if (isExistInCart) {
        const newCart = await updateCartQuantity({
          product_id: product.product_id,
          quantity: product.quantity,
          color: product.color,
        });
        dispatch(actions.user.setUserCart(newCart));
        dispatch(
          actions.user.setUserCartTotal(product.quantity * product.price)
        );
      } else {
        const newCart = await addProductCart({
          product_id: product.product_id,
          quantity: product.quantity,
          color: product.color,
        });
        dispatch(actions.user.setUserCart(newCart));
        dispatch(
          actions.user.setUserCartTotal(product.quantity * product.price)
        );
      }
      onDone?.();
    } catch (error) {}
  };

  return {
    isLoading,
    cart,
    checkCart,
    handleAddProduct,
  };
};

export default useCart;
