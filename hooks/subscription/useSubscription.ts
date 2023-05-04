import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { SubscriptionType } from '../../models/subscription';
import { getSubscriptionById } from '../../services/cms';

const useOrdered = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionType>();
  const { t } = useTranslation();
  const toast = useToast();
  const subscriptionId = useMemo(
    () => router.query.subscription_id?.toString(),
    [router.query.subscription_id]
  );

  const getSubscription = useCallback(async () => {
    try {
      const currentSubscription = await getSubscriptionById(
        subscriptionId || ''
      );
      setSubscription(currentSubscription);
      return currentSubscription;
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
  }, [subscriptionId, t, toast]);

  useEffect(() => {
    if (!router.isReady) return;
    if (subscriptionId) {
      getSubscription();
    }
  }, [getSubscription, router.isReady, subscriptionId]);

  return { isLoading, subscription };
};

export default useOrdered;
