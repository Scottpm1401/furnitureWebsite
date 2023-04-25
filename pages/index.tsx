import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import Newsletter from '../components/Home/Newsletter';
import Section1 from '../components/Home/Section1';
import Section2 from '../components/Home/Section2';
import Section3 from '../components/Home/Section3';
import Page from '../layout/Page';
import NotAuthProvider from '../layout/Provider/NotAuthProvider';
import { NextApplicationPage } from './_app';

const Home: NextApplicationPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Page direction='column'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <title>Comfysloth</title>
        <meta name='description' content='This is Comfysloth' />

        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Comfysloth' />
        <meta
          property='og:url'
          content={`${process.env.NEXT_PUBLIC_FE_URL}${router.pathname}`}
        />
        <meta property='og:title' content='Comfysloth' />
        <meta property='og:description' content='This is Comfysloth' />
        <meta
          property='og:image'
          content={`${process.env.NEXT_PUBLIC_CDN}/v1681371531/furniture/banners/pbpjourmaairp0pasci4.jpg`}
        />
        <meta property='og:image:width' content='800' />
        <meta property='og:image:height' content='600' />
        <meta
          property='og:image:alt'
          content={`${process.env.NEXT_PUBLIC_CDN}/v1681371531/furniture/banners/pbpjourmaairp0pasci4.jpg`}
        />

        <meta itemProp='name' content='Comfysloth' />
        <meta itemProp='description' content='This is Comfysloth' />
        <meta
          itemProp='image'
          content={`${process.env.NEXT_PUBLIC_CDN}/v1681371531/furniture/banners/pbpjourmaairp0pasci4.jpg`}
        />

        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Section1 />
      <Section2 />
      <Section3 />
      <Newsletter />
    </Page>
  );
};

Home.getLayout = (page: React.ReactElement) => {
  return <NotAuthProvider>{page}</NotAuthProvider>;
};

export default Home;
