import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { UserType } from '../../models/user';
import { getUserById } from '../../services/cms';

const useUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType>();
  const { t } = useTranslation();
  const toast = useToast();
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
  }, [t, toast, userId]);

  useEffect(() => {
    if (!router.isReady) return;
    if (userId) {
      getUser();
    }
  }, [getUser, router.isReady, userId]);

  return { isLoading, user };
};

export default useUser;
