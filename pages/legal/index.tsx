import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loader from '../../components/Loader';
import { APP_ROUTES } from '../../constant';

const Legal = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(APP_ROUTES.termAndCondition);
  }, [router]);

  return <Loader />;
};

export default Legal;
