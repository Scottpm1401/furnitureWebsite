import { Flex, FlexProps, Stack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { APP_ROUTES } from '../../constant';
import { NAV_HEIGHT } from '../Nav';

type Props = {
  title?: string;
  description?: string;
  img?: string;
} & FlexProps;

const Page = ({ children, title, description, img, ...props }: Props) => {
  const router = useRouter();
  const isInCms = useMemo(
    () => router.pathname.includes(APP_ROUTES.cms.dashboard),
    [router.pathname]
  );

  return (
    <Stack w='full' h='full'>
      {/* <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <title>{title || 'Comfysloth'}</title>
        <meta property='og:type' content='object' />
        <meta property='og:site_name' content='Comfysloth' />
        <meta
          property='og:url'
          content={`${process.env.NEXT_PUBLIC_FE_URL}${router.pathname}`}
        />
        <meta
          name='description'
          content={description || 'Bring the comfort to your home'}
        />
        <meta property='og:title' content={title || 'Comfysloth'} />
        <meta
          property='og:description'
          content={description || 'Bring the comfort to your home'}
        />
        <meta
          property='og:image'
          content={
            img
              ? `${process.env.NEXT_PUBLIC_CDN}${img}`
              : 'https://res.cloudinary.com/scottcloud/image/upload/v1671091687/furniture/banners/slider_img_1_lt3wft'
          }
        />
        <meta property='og:image:width' content='800' />
        <meta property='og:image:height' content='600' />
        <meta
          property='og:image:alt'
          content={
            img
              ? `${process.env.NEXT_PUBLIC_CDN}${img}`
              : 'https://res.cloudinary.com/scottcloud/image/upload/v1671091687/furniture/banners/slider_img_1_lt3wft'
          }
        />
        <link rel='icon' href='/favicon.svg' />
      </Head> */}

      <Flex
        mt={router.pathname === APP_ROUTES.home || isInCms ? 0 : NAV_HEIGHT}
        {...props}
      >
        {children}
      </Flex>
    </Stack>
  );
};

export default Page;
