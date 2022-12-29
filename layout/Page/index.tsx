import { Flex, FlexProps } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { NAV_HEIGHT } from '../../components/Nav';

type Props = { title?: string } & FlexProps;

const Page = ({ children, title, ...props }: Props) => {
  const router = useRouter();
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}

      <Flex mt={router.pathname === '/' ? 0 : NAV_HEIGHT} {...props}>
        {children}
      </Flex>
    </>
  );
};

export default Page;
