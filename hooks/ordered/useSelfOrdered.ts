import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { PurchaseType } from '../../models/purchase';
import { getSelfOrdered } from '../../services/ordered';

const useSelfOrdered = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ordered, setOrdered] = useState<PurchaseType[]>();
  const { t } = useTranslation();
  const toast = useToast();

  const getOrdered = useCallback(async () => {
    try {
      const currentOrdered = await getSelfOrdered();
      setOrdered(currentOrdered);
      return currentOrdered;
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [t, toast]);

  useEffect(() => {
    getOrdered();
  }, [getOrdered]);

  return { isLoading, ordered, getOrdered };
};

export default useSelfOrdered;
