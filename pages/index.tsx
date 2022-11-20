import { Button } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../components/Container';
import { selectAuthState, setAuthState } from '../redux/reducer';

type Props = {};

const Home = () => {
  const { t } = useTranslation();

  return <Container></Container>;
};

export default Home;
