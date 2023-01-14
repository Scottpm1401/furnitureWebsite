import { useEffect, useState } from 'react';

import { createPayment } from '../services/payment';

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | undefined>();

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
    getClientSecret();
  }, []);

  return { isLoading, clientSecret };
};
