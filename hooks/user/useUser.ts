import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { UserType } from '../../models/user';
import { getUserById } from '../../services/cms';

const useUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType>();
  const userId = useMemo(
    () => router.query.user_id?.toString(),
    [router.query.user_id]
  );

  const getUser = useCallback(async () => {
    try {
      const currentUser = await getUserById(userId || '');
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!router.isReady) return;
    if (userId) {
      getUser();
    }
  }, [getUser, router.isReady, userId]);

  return { isLoading, user };
};

export default useUser;
