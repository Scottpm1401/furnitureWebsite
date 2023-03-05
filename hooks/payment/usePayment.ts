import { useEffect, useState } from 'react';

import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';
import { createPayment } from '../../services/payment';

const usePayment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const userCart = useAppSelector(selectors.user.selectUserCart);

  const getClientSecret = async () => {
    try {
      const res = await createPayment();
      setClientSecret(res.clientSecret);
      return res.clientSecret;
    } catch (err) {
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userCart.length === 0) {
      setIsLoading(false);
      return;
    }
    getClientSecret();
  }, [userCart.length]);

  return { isLoading, clientSecret };
};

export default usePayment;
