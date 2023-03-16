import Newsletter from '../components/Home/Newsletter';
import Section1 from '../components/Home/Section1';
import Section2 from '../components/Home/Section2';
import Section3 from '../components/Home/Section3';
import NotAuthProvider from '../layout/NotAuthProvider';
import Page from '../layout/Page';

const Home = () => {
  return (
    <NotAuthProvider>
      <Page direction='column'>
        <Section1 />
        <Section2 />
        <Section3 />
        <Newsletter />
      </Page>
    </NotAuthProvider>
  );
};

export default Home;
