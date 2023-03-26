import { useCallback, useEffect, useState } from 'react';

import { Revenue } from '../../models/analysis';
import { getRevenuePerMonth } from '../../services/cms';

const useRevenue = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revenue, setRevenue] = useState<Revenue[]>([]);

  const getRevenue = useCallback(async () => {
    try {
      setIsLoading(true);
      const dataSet = await getRevenuePerMonth();
      setRevenue(dataSet);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getRevenue();
  }, [getRevenue]);

  return {
    revenue,
    isLoading,
  };
};

export default useRevenue;
