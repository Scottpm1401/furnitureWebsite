import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { GetAllUsersParams } from '../models/api/cms';
import { UserType } from '../models/user';
import { getAllUsers } from '../services/cms';

export const useUsers = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [total, setTotal] = useState(0);

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
    (args: GetAllUsersParams) => {
      const newQuery = { ...router.query, ...args };
      const url = { pathname: router.pathname, query: newQuery };
      const opts = { shallow: true, scroll: false };
      router.push(url, undefined, opts);
    },
    [router]
  );

  const getUsers = useCallback(
    async (resOffset: number, resLimit: number, resSearch?: string) => {
      try {
        setIsLoading(true);
        const { data, total } = await getAllUsers({
          offset: resOffset,
          limit: resLimit,
          search: resSearch,
        });
        setUsers(data);
        setTotal(total);
        handleQuery({
          offset: resOffset,
          limit: resLimit,
          search: resSearch,
        });
        return data;
      } catch (err) {
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [handleQuery]
  );

  useEffect(() => {
    if (!router.isReady) return;

    if (users.length < 1 && !isLoading) {
      getUsers(offset, limit, search);
    }
  }, [
    getUsers,
    isLoading,
    limit,
    offset,
    router.isReady,
    search,
    users.length,
  ]);

  return {
    isLoading,
    users,
    total,
    offset,
    limit,
    search,
    getUsers,
    hasPrevious,
    hasNext,
  };
};
