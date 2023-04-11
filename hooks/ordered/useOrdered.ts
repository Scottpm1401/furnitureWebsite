import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { PurchaseType } from '../../models/purchase';
import { getOrderedById } from '../../services/cms';

const useOrdered = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [ordered, setOrdered] = useState<PurchaseType>();
  const { t } = useTranslation();
  const toast = useToast();
  const orderedId = useMemo(
    () => router.query.ordered_id?.toString(),
    [router.query.ordered_id]
  );

  const getOrdered = useCallback(async () => {
    try {
      const currentOrdered = await getOrderedById(orderedId || '');
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
    } finally {
      setIsLoading(false);
    }
  }, [orderedId, t, toast]);

  useEffect(() => {
    if (!router.isReady) return;
    if (orderedId) {
      getOrdered();
    }
  }, [getOrdered, router.isReady, orderedId]);

  return { isLoading, ordered };
};

export default useOrdered;
