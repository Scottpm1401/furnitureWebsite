import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { PurchaseType } from '../../models/purchase';
import { getOrderedById } from '../../services/cms';

const useOrdered = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [ordered, setOrdered] = useState<PurchaseType>();
  const orderedId = useMemo(
    () => router.query.ordered_id?.toString(),
    [router.query.ordered_id]
  );

  const getUser = useCallback(async () => {
    try {
      const currentOrdered = await getOrderedById(orderedId || '');
      setOrdered(currentOrdered);
      return currentOrdered;
    } catch (err) {
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [orderedId]);

  useEffect(() => {
    if (!router.isReady) return;
    if (orderedId) {
      getUser();
    }
  }, [getUser, router.isReady, orderedId]);

  return { isLoading, ordered };
};

export default useOrdered;
