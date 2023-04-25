import { Flex, FlexProps } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';

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
    <>
      {/* {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )} */}

      <NextSeo
        title={title || 'Comfysloth'}
        description={description || 'Bring the comfort to your home'}
        openGraph={{
          title: title || 'Comfysloth',
          url: `${process.env.NEXT_PUBLIC_FE_URL}${router.pathname}`,
          description: description || 'Bring the comfort to your home',
          images: img
            ? [
                {
                  url: img,
                  width: 800,
                  height: 600,
                  alt: 'Image',
                },
              ]
            : [
                {
                  url: `https://res.cloudinary.com/scottcloud/image/upload/v1671091687/furniture/banners/slider_img_1_lt3wft`,
                  width: 800,
                  height: 600,
                  alt: 'Banner',
                },
              ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.svg',
          },
        ]}
      />

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
