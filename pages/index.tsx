import { Button, Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../components/Container';
import Section1 from '../components/Home/Section1';
import Section2 from '../components/Home/Section2';
import { selectAuthState, setAuthState } from '../redux/reducer';

type Props = {};

const Home = () => {
  const { t } = useTranslation();

  return (
    <Flex direction='column'>
      <Section1 />
      <Section2 />
    </Flex>
  );
};

export default Home;
