import { Flex, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import LoginForm from '../../components/Form/LoginForm';
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
          { title: t('sign_in'), href: '/login' },
        ]}
        current={t('sign_in')}
      />
      <Flex
        mt='5rem'
        direction='column'
        minW='340px'
        minHeight='60vh'
        justifyContent='center'
      >
        <Flex mb='1rem' justifyContent='center'>
          <Text fontSize='3xl' fontWeight='semibold'>
            {t('sign_in_to_comfysloth')}
          </Text>
        </Flex>
        <LoginForm />
        <Flex
          mt='1rem'
          paddingY='1rem'
          borderRadius='0.5rem'
          justifyContent='center'
          alignItems='center'
          bg='orange.50'
        >
          <Text mr='0.25rem'>{t('new_to_comfysloth')}</Text>
          <NavLink
            title={t('create_an_account')}
            href='/signup'
            textProps={{ color: 'blue' }}
            isSpacing={false}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
