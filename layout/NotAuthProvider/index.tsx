import React, { useEffect } from 'react';

import Loader from '../../components/Loader';
import { useUser } from '../../hooks/useUser';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';

type Props = { children: JSX.Element };

const NotAuthProvider = ({ children }: Props) => {
  const { isLoading } = useUser();
  const userId = useAppSelector(selectors.user.selectUserId);
  const [verified, setVerified] = React.useState(false);
  useEffect(() => {
    if (isLoading) return;
    setVerified(true);
  }, [isLoading]);

  if (verified || userId) return children;

  return <Loader />;
};

export default NotAuthProvider;
