import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

import { TopUser } from '../../models/analysis';
import { getTop10UsersByMonth } from '../../services/cms';

const useTopUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);

  const getTopUsers = useCallback(async (month: number) => {
    try {
      setIsLoading(true);
      const dataSet = await getTop10UsersByMonth(month);
      setTopUsers(dataSet);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
