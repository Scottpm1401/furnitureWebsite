import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import Loader from '../../../components/Loader';
import { APP_ROUTES } from '../../../constant';

type Props = { children: JSX.Element };

const CodeProvider = ({ children }: Props) => {
  const router = useRouter();
  const code = useMemo(
    () => router.query.code?.toString(),
    [router.query.code]
  );
  const [verified, setVerified] = React.useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!code) {
      router.push(APP_ROUTES.home);
      return;
    }
    setVerified(true);
  }, [code, router, router.isReady]);

  if (verified) return children;

  return <Loader />;
};

export default CodeProvider;
