import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { AnalysisDate, TopUser } from '../../models/analysis';
import { getTop10UsersByMonth } from '../../services/cms';

const currentMonth = Number(moment().format('M'));
const currentYear = Number(moment().format('Y'));
const initialDate: AnalysisDate = {
  month: currentMonth,
  year: currentYear,
};

const useTopUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const { t } = useTranslation();
  const toast = useToast();

  const getTopUsers = useCallback(
    async (date: AnalysisDate) => {
      try {
        setIsLoading(true);
        const dataSet = await getTop10UsersByMonth(date);
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
    getTopUsers(initialDate);
  }, [getTopUsers]);

  return {
    topUsers,
    getTopUsers,
    isLoading,
  };
};

export default useTopUsers;
