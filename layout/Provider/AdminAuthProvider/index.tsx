import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Loader from '../../../components/Loader';
import { APP_ROUTES } from '../../../constant';
import { useCurrentUser } from '../../../hooks/user';
import { Role } from '../../../models/user';
import ScreenSizeFilteringProvider from '../ScreenSizeFilteringProvider';

type Props = { children: JSX.Element };

const AdminAuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const { isLoading, user } = useCurrentUser();
  const [verified, setVerified] = React.useState(false);
  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push(APP_ROUTES.login);
      return;
    }
    if (user.role !== Role.admin) {
      router.push(APP_ROUTES.home);
      return;
    }
    setVerified(true);
  }, [isLoading, router, user]);

  if (verified)
    return (
      <ScreenSizeFilteringProvider>{children}</ScreenSizeFilteringProvider>
    );

  return <Loader />;
};

export default AdminAuthProvider;
