import 'moment/locale/vi';
import '../styles/globals.css';

import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import moment from 'moment';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { ReactElement, ReactNode, useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { APP_ROUTES } from '../constant';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import TemplateProvider from '../layout/Provider/TemplateProvider';
import CmsSideBar from '../layout/SideBar/CmsSideBar';
import { persistor, store } from '../redux/store';
import theme from '../theme';

export type NextApplicationPage<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextApplicationPage;
}

const App = (props: MyAppProps) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  const { lang } = useTranslation();
  const isInCms = useMemo(
    () => router.pathname.includes(APP_ROUTES.cms.dashboard),
    [router.pathname]
  );

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    if (lang !== moment.locale()) moment.locale(lang);
  }, [lang]);

  return (
    <Provider store={store}>
      <NextSeo
        title={'Comfysloth'}
        description={'Bring comfort to your home'}
        canonical={`${process.env.NEXT_PUBLIC_FE_URL}${router.pathname}`}
        openGraph={{
          title: 'Comfysloth',
          description: 'Bring comfort to your home',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_CDN}/v1671091687/furniture/banners/slider_img_1_lt3wft.jpg`,
              width: 800,
              height: 600,
              alt: 'banner',
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

      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <TemplateProvider>
            <Flex direction={isInCms ? 'row' : 'column'}>
              {!isInCms ? <Nav /> : <CmsSideBar />}
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              {getLayout(<Component {...pageProps} />)}
              {!isInCms && <Footer />}
              <Analytics />
            </Flex>
          </TemplateProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
