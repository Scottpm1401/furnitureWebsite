import { Flex, FlexProps } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { actions } from '../../redux/reducer';
import { getProfile } from '../../services/user';

type Props = {} & FlexProps;

const AuthProvide = ({ children, ...props }: Props) => {
  const dispatch = useAppDispatch();

  const authorizeUser = useCallback(async () => {
    try {
      const user = await getProfile();
      dispatch(actions.user.setUser(user));
    } catch (err) {
      console.log('Unauthorized');
    }
  }, [dispatch]);

  authorizeUser();

  return (
    <Flex direction='column' w='full' h='full' {...props}>
      {children}
    </Flex>
  );
};

export default AuthProvide;
