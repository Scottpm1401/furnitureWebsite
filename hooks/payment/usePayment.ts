import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';
import { createPayment } from '../../services/payment';

const usePayment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
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

  useEffect(() => {
    if (userCart.length === 0) {
      setIsLoading(false);
      return;
    }
    getClientSecret();
  }, [getClientSecret, userCart.length]);

  return { isLoading, clientSecret };
};

export default usePayment;
