import { Flex, FlexProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
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
    <>
      <NextSeo
        title={title || 'Comfysloth'}
        description={description || 'Bring comfort to your home'}
        canonical={`${process.env.NEXT_PUBLIC_NEXT_PUBLIC_FE_URL}${router.pathname}`}
        openGraph={{
          title: title || 'Comfysloth',
          description: description || 'Bring comfort to your home',
          images: [
            {
              url: img
                ? `${process.env.NEXT_PUBLIC_CDN}${img}`
                : `${process.env.NEXT_PUBLIC_CDN}/v1671091687/furniture/banners/slider_img_1_lt3wft.jpg`,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
          site_name: 'Comfysloth',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
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
