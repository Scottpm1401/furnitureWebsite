import { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch } from '../redux/hooks';
import { actions } from '../redux/reducer';
import { UserState } from '../redux/reducers/userReducer';
import { getProfile } from '../services/user';

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<UserState>();

  const getUser = useCallback(async () => {
    try {
      const currentUser = await getProfile();
      setUser(currentUser);
      dispatch(actions.user.setUser(currentUser));
      return currentUser;
    } catch (err) {
      return undefined;
    } finally {
      setIsLoading(true);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  // const user = useMemo(async () => {
  //   try {
  //     const currentUser = await getProfile();
  //     dispatch(actions.user.setUser(currentUser));
  //     return currentUser;
  //   } catch (err) {
  //     return undefined;
  //   } finally {
  //     setIsLoading(true);
  //   }
  // }, [dispatch]);

  return { isLoading, user };
};
