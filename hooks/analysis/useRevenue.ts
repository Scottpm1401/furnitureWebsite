import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { Revenue } from '../../models/analysis';
import { getRevenuePerMonth } from '../../services/cms';

const useRevenue = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const { t } = useTranslation();
  const toast = useToast();

  const getRevenue = useCallback(async () => {
    try {
      setIsLoading(true);
      const dataSet = await getRevenuePerMonth();
      setRevenue(dataSet);
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
  }, [t, toast]);

  useEffect(() => {
    getRevenue();
  }, [getRevenue]);

  return {
    revenue,
    isLoading,
  };
};

export default useRevenue;
