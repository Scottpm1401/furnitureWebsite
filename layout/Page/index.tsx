import { Flex, FlexProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { OpenGraphMedia } from 'next-seo/lib/types';
import React, { useMemo } from 'react';

import { APP_ROUTES, DEFAULT_SEO_IMAGE } from '../../constant';
import { NAV_HEIGHT } from '../Nav';

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: OpenGraphMedia;
} & FlexProps;

const Page = ({
  children,
  title,
  description,
  canonical,
  image,
  ...props
}: Props) => {
  const router = useRouter();
  const isInCms = useMemo(
    () => router.pathname.includes(APP_ROUTES.cms.dashboard),
    [router.pathname]
  );
  return (
    <>
      <NextSeo
        additionalLinkTags={[{ rel: 'icon', href: '/favicon.svg' }]}
        title={title || 'Comfysloth'}
        description={description}
        canonical={canonical}
        openGraph={{
          title: title || 'Comfysloth',
          description,
          images: image
            ? [image]
            : [
                {
                  url: DEFAULT_SEO_IMAGE,
                  alt: 'Comfysloth',
                  width: 800,
                  height: 600,
                },
              ],
        }}
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
