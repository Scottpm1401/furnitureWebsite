import { Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Section1 from '../components/Home/Section1';
import Section2 from '../components/Home/Section2';
import Section3 from '../components/Home/Section3';

type Props = {};

const Home = () => {
  const { t } = useTranslation();

  return (
    <Flex direction='column'>
      <Section1 />
      <Section2 />
      <Section3 />
    </Flex>
  );
};

export default Home;
