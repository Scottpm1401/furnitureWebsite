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

  return (
    <Page direction='column' title={t('home')}>
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
