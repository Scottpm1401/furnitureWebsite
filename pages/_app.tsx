import 'moment/locale/vi';
import '../styles/globals.css';

import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import moment from 'moment';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
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
      <DefaultSeo
        openGraph={{
          title: 'Comfysloth',
          description: 'Bring the comfort to your home',
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_FE_URL}${router.pathname}`,
          images: [
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
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <TemplateProvider>
            <>
              <Flex direction={isInCms ? 'row' : 'column'}>
                {!isInCms ? <Nav /> : <CmsSideBar />}
                <ColorModeScript
                  initialColorMode={theme.config.initialColorMode}
                />
                {getLayout(<Component {...pageProps} />)}
                {!isInCms && <Footer />}
              </Flex>
            </>
          </TemplateProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
