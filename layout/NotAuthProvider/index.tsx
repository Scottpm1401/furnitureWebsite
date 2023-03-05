import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Loader from '../../components/Loader';
import { APP_ROUTES } from '../../constant';
import { useCurrentUser } from '../../hooks/user';

type Props = { children: JSX.Element };

const NotAuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();
  const [verified, setVerified] = React.useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (
      user &&
      (router.pathname === APP_ROUTES.login ||
        router.pathname === APP_ROUTES.signup)
    ) {
      router.push(APP_ROUTES.home);
      return;
    }
    setVerified(true);
  }, [isLoading, router, user]);

  if (verified) return children;

  return <Loader />;
};

export default NotAuthProvider;
