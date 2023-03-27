import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

import { BoughtProduct } from '../../models/analysis';
import { getBoughtProductByMonth } from '../../services/cms';

const useBoughtProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);

  const getBoughtProduct = useCallback(async (month: number) => {
    try {
      setIsLoading(true);
      const dataSet = await getBoughtProductByMonth(month);

      setBoughtProducts(dataSet);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getBoughtProduct(parseInt(moment().format('M')));
  }, [getBoughtProduct]);

  return {
    boughtProducts,
    isLoading,
    getBoughtProduct,
  };
};

export default useBoughtProducts;
