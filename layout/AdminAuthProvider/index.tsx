import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Loader from '../../components/Loader';
import { APP_ROUTES } from '../../constant';
import { useUser } from '../../hooks/useUser';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';

type Props = { children: JSX.Element };

const AdminAuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const userId = useAppSelector(selectors.user.selectUserId);
  const [verified, setVerified] = React.useState(false);
  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push(APP_ROUTES.login);
      return;
    }
    if (user.role !== 'ADMIN') {
      router.push(APP_ROUTES.home);
      return;
    }
    setVerified(true);
  }, [isLoading, router, user]);

  if (verified || userId) return children;

  return <Loader />;
};

export default AdminAuthProvider;
