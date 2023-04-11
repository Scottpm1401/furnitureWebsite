import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { SearchPagination } from '../../models/api/cms';
import { ProductType } from '../../models/product';
import { getAllProducts } from '../../services/cms';

const useProducts = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);
  const [empty, setEmpty] = useState(false);
  const { t } = useTranslation();
  const toast = useToast();

  const offset = useMemo(
    () => (router.query.offset ? Number(router.query.offset) : 0),
    [router.query.offset]
  );
  const limit = useMemo(
    () => (router.query.limit ? Number(router.query.limit) : 10),
    [router.query.limit]
  );
  const search = useMemo(
    () => router.query.search?.toString(),
    [router.query.search]
  );
  const hasPrevious = useMemo(() => offset !== 0, [offset]);
  const hasNext = useMemo(() => offset + limit < total, [limit, offset, total]);

  const handleQuery = useCallback(
    (args: SearchPagination) => {
      const newQuery = { ...router.query, ...args };
      const url = { pathname: router.pathname, query: newQuery };
      const opts = { shallow: true, scroll: false };
      router.push(url, undefined, opts);
    },
    [router]
  );

  const getProductsList = useCallback(
    async (resOffset: number, resLimit: number, resSearch?: string) => {
      try {
        setIsLoading(true);
        const { data, total } = await getAllProducts({
          offset: resOffset,
          limit: resLimit,
          search: resSearch,
        });
        setEmpty(data.length < 1);
        setProducts(data);
        setTotal(total);
        handleQuery({
          offset: resOffset,
          limit: resLimit,
          search: resSearch,
        });
        return data;
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
    },
    [handleQuery, t, toast]
  );

  useEffect(() => {
    if (!router.isReady) return;

    if (products.length < 1 && !isLoading && !empty) {
      getProductsList(offset, limit, search);
    }
  }, [
    getProductsList,
    isLoading,
    limit,
    offset,
    router.isReady,
    search,
    products.length,
    empty,
  ]);

  return {
    isLoading,
    products,
    total,
    offset,
    limit,
    search,
    getProductsList,
    hasPrevious,
    hasNext,
  };
};

export default useProducts;
