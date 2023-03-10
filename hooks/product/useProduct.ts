import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ProductType } from '../../models/product';
import { getProductById } from '../../services/product';

const useProduct = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductType>();
  const productId = useMemo(
    () => router.query.product_id?.toString(),
    [router.query.product_id]
  );

  const getProduct = useCallback(async () => {
    try {
      const currentProduct = await getProductById(productId || '');
      setProduct(currentProduct);
      return currentProduct;
    } catch (err) {
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (!router.isReady) return;
    if (productId) {
      getProduct();
    }
  }, [getProduct, router.isReady, productId]);

  return { isLoading, product, getProduct };
};

export default useProduct;
