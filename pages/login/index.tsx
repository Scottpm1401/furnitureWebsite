import { Flex, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import LoginForm from '../../components/Form/LoginForm';
import { APP_ROUTES, FORM_BOX_SHADOW } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import NavLink from '../../layout/Nav/NavLink';
import Page from '../../layout/Page';
import NotAuthProvider from '../../layout/Provider/NotAuthProvider';
import { NextApplicationPage } from '../_app';

const Login: NextApplicationPage = () => {
  const { t } = useTranslation();
  const { isSmallDevice } = useResponsive();
  return (
    <Page
      alignItems='center'
      justifyContent='center'
      direction='column'
      title={t('sign_in')}
    >
      <Breadcrumb
        links={[
          { title: t('home'), href: APP_ROUTES.home },
          { title: t('sign_in'), href: APP_ROUTES.login },
        ]}
        current={t('sign_in')}
      />
      <Flex
        mt='5rem'
        direction='column'
        minW={isSmallDevice ? '90%' : '340px'}
        minHeight='60vh'
        justifyContent='center'
      >
        <Flex mb='1rem' justifyContent='center'>
          <Text
            maxW={isSmallDevice ? '90vw' : 'unset'}
            fontSize='3xl'
            fontWeight='semibold'
            textAlign={isSmallDevice ? 'center' : 'initial'}
          >
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
          bg='transparent'
          boxShadow={FORM_BOX_SHADOW}
        >
          <Text mr='0.25rem'>{t('new_to_comfysloth')}</Text>
          <NavLink
            title={t('create_an_account')}
            href={APP_ROUTES.signup}
            textProps={{ color: 'orange.400' }}
            isSpacing={false}
          />
        </Flex>
      </Flex>
    </Page>
  );
};

Login.getLayout = (page: React.ReactElement) => {
  return <NotAuthProvider>{page}</NotAuthProvider>;
};

export default Login;
