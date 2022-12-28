import { Flex, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import SignupForm from '../../components/Form/SignupForm';
import { NAV_HEIGHT } from '../../components/Nav';
import NavLink from '../../components/Nav/NavLink';

type Props = {};

const Login = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Flex
      mt={NAV_HEIGHT}
      alignItems='center'
      justifyContent='center'
      direction='column'
    >
      <Breadcrumb
        links={[
          { title: t('home'), href: '/' },
          { title: t('sign_up'), href: '/signup' },
        ]}
        current={t('sign_up')}
      />
      <Flex
        mt='5rem'
        direction='column'
        minW='400px'
        minHeight='60vh'
        justifyContent='center'
      >
        <Flex mb='1rem' justifyContent='center'>
          <Text fontSize='3xl' fontWeight='semibold'>
            {t('create_a_new_account')}
          </Text>
        </Flex>
        <SignupForm />
        <Flex
          mt='1rem'
          paddingY='1rem'
          borderRadius='0.5rem'
          justifyContent='center'
          alignItems='center'
          bg='orange.50'
        >
          <NavLink
            title={t('already_have_an_account')}
            href='/login'
            textProps={{ color: 'blue' }}
            isSpacing={false}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
