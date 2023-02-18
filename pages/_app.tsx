import '../styles/globals.css';

import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { APP_ROUTES } from '../constant';
import CmsSideBar from '../layout/CmsSideBar';
import { persistor, store } from '../redux/store';
import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isInCms = useMemo(
    () => router.pathname.includes(APP_ROUTES.cms),
    [router.pathname]
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Comfysloth</title>
            <link rel='icon' href='/favicon.svg' />
          </Head>
          <Flex direction={isInCms ? 'row' : 'column'}>
            {!isInCms ? <Nav /> : <CmsSideBar />}

            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Component {...pageProps} />
            {!isInCms && <Footer />}
          </Flex>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
