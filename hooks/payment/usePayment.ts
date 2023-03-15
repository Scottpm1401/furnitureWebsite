import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { APP_ROUTES } from '../../constant';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';
import { createPayment, productCheck } from '../../services/payment';

const usePayment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();
  const { t } = useTranslation();
  const toast = useToast();
  const userCart = useAppSelector(selectors.user.selectUserCart);

  const getClientSecret = useCallback(async () => {
    try {
      const res = await createPayment();
      setClientSecret(res.clientSecret);
      return res.clientSecret;
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title: t(err.response?.data.message),
          duration: 5000,
          status: 'error',
          position: 'top-right',
        });
        return undefined;
      }
    } finally {
      setIsLoading(false);
    }
  }, [t, toast]);

  const checkCart = useCallback(async () => {
    try {
      const checkReq = await userCart.map(
        async (item) => await productCheck(item.product_id, item.quantity)
      );
      await Promise.all(checkReq);
      return true;
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title: t(err.response?.data.message),
          duration: 5000,
          status: 'error',
          position: 'top-right',
        });
        setTimeout(() => router.push(APP_ROUTES.cart), 5000);
        return false;
      }
    }
  }, [router, t, toast, userCart]);

  useEffect(() => {
    if (userCart.length === 0) {
      setIsLoading(false);
      return;
    }
    checkCart().then((value) => {
      if (value) getClientSecret();
    });
  }, [checkCart, getClientSecret, userCart.length]);

  return { isLoading, clientSecret, checkCart };
};

export default usePayment;
