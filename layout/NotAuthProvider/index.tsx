import React, { useEffect } from 'react';

import Loader from '../../components/Loader';
import { useUser } from '../../hooks/useUser';

type Props = { children: JSX.Element };

const NotAuthProvider = ({ children }: Props) => {
  const { isLoading } = useUser();
  const [verified, setVerified] = React.useState(false);
  useEffect(() => {
    if (isLoading) return;
    setVerified(true);
  }, [isLoading]);

  if (verified) return children;

  return <Loader />;
};

export default NotAuthProvider;
