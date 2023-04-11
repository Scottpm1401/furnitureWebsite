import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { BoughtProduct } from '../../models/analysis';
import { getBoughtProductByMonth } from '../../services/cms';

const useBoughtProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);
  const { t } = useTranslation();
  const toast = useToast();

  const getBoughtProduct = useCallback(
    async (month: number) => {
      try {
        setIsLoading(true);
        const dataSet = await getBoughtProductByMonth(month);

        setBoughtProducts(dataSet);
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
    },
    [t, toast]
  );

  useEffect(() => {
    getBoughtProduct(Number(moment().format('M')));
  }, [getBoughtProduct]);

  return {
    boughtProducts,
    isLoading,
    getBoughtProduct,
  };
};

export default useBoughtProducts;
