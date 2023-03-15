import React, { useCallback, useEffect, useState } from 'react';

import { ProductCartType } from '../../models/cart';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';
import { productCheck } from '../../services/payment';

type CartType = { isAvailable?: boolean } & ProductCartType;

const useCart = () => {
  const userCart = useAppSelector(selectors.user.selectUserCart);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartType[]>([]);

  const checkCart = useCallback(async () => {
    setIsLoading(true);
    const cartReq = userCart.map(async (item) => {
      const req: CartType = {
        ...item,
      };
      try {
        req.isAvailable = (await productCheck(req.product_id)).success;
      } catch (error) {
        req.isAvailable = false;
      }

      return req;
    });
    const newCart = await Promise.all(cartReq);
    setCart(newCart);

    setIsLoading(false);
  }, [userCart]);

  useEffect(() => {
    checkCart();
  }, [checkCart]);

  return {
    isLoading,
    cart,
    checkCart,
  };
};

export default useCart;
