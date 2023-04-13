import useTranslation from 'next-translate/useTranslation';

import Newsletter from '../components/Home/Newsletter';
import Section1 from '../components/Home/Section1';
import Section2 from '../components/Home/Section2';
import Section3 from '../components/Home/Section3';
import Page from '../layout/Page';
import NotAuthProvider from '../layout/Provider/NotAuthProvider';

const Home = () => {
  const { t } = useTranslation();
  return (
    <NotAuthProvider>
      <Page direction='column' title={t('home')}>
        <Section1 />
        <Section2 />
        <Section3 />
        <Newsletter />
      </Page>
    </NotAuthProvider>
  );
};

export default Home;
