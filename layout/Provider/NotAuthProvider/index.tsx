import { includes } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Loader from '../../../components/Loader';
import { APP_ROUTES, NOT_AUTH_APP_ROUTES } from '../../../constant';
import { useCurrentUser } from '../../../hooks/user';

type Props = { children: JSX.Element };

const NotAuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();
  const [verified, setVerified] = React.useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (user && includes(NOT_AUTH_APP_ROUTES, router.pathname)) {
      router.push(APP_ROUTES.home);
      return;
    }
    setVerified(true);
  }, [isLoading, router, user]);

  if (verified) return children;

  return <Loader />;
};

export default NotAuthProvider;
