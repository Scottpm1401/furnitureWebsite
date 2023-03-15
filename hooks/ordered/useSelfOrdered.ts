import { useCallback, useEffect, useState } from 'react';

import { PurchaseType } from '../../models/purchase';
import { getSelfOrdered } from '../../services/ordered';

const useSelfOrdered = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ordered, setOrdered] = useState<PurchaseType[]>();

  const getOrdered = useCallback(async () => {
    try {
      const currentOrdered = await getSelfOrdered();
      setOrdered(currentOrdered);
      return currentOrdered;
    } catch (err) {
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrdered();
  }, [getOrdered]);

  return { isLoading, ordered, getOrdered };
};

export default useSelfOrdered;
