import '../styles/globals.css';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import Nav from '../components/Nav';
import { wrapper } from '../redux/store';
import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Comfysloth</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Nav />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);
