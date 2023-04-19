import { useCallback, useEffect, useState } from 'react';

import { UserType } from '../../models/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions, selectors } from '../../redux/reducer';
import { getProfile } from '../../services/user';

const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const storedUser = useAppSelector(selectors.user.selectUser);
  const [user, setUser] = useState<UserType>();

  const getUser = useCallback(async () => {
    try {
      const currentUser = await getProfile();
      setUser(currentUser);
      dispatch(actions.user.setUser(currentUser));
      return currentUser;
    } catch (err) {
      setUser(undefined);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!storedUser._id) {
      getUser();
    } else {
      setUser(storedUser);
      setIsLoading(false);
    }
  }, [getUser, storedUser]);

  return { isLoading, user };
};

export default useCurrentUser;
