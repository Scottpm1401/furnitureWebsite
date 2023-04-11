import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { TopUser } from '../../models/analysis';
import { getTop10UsersByMonth } from '../../services/cms';

const useTopUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const { t } = useTranslation();
  const toast = useToast();

  const getTopUsers = useCallback(
    async (month: number) => {
      try {
        setIsLoading(true);
        const dataSet = await getTop10UsersByMonth(month);
        setTopUsers(dataSet);
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
    getTopUsers(Number(moment().format('M')));
  }, [getTopUsers]);

  return {
    topUsers,
    getTopUsers,
    isLoading,
  };
};

export default useTopUsers;
