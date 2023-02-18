import { Flex, FlexProps } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { NAV_HEIGHT } from '../../components/Nav';
import { APP_ROUTES } from '../../constant';

type Props = { title?: string } & FlexProps;

const Page = ({ children, title, ...props }: Props) => {
  const router = useRouter();
  const isInCms = useMemo(
    () => router.pathname.includes(APP_ROUTES.cms),
    [router.pathname]
  );
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}

      <Flex
        mt={router.pathname === APP_ROUTES.home || isInCms ? 0 : NAV_HEIGHT}
        {...props}
      >
        {children}
      </Flex>
    </>
  );
};

export default Page;
