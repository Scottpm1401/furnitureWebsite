import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { APP_ROUTES } from '../../constant';

type Props = {};

const Legal = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.push(APP_ROUTES.termAndCondition);
  }, [router]);
  return <></>;
};

export default Legal;
