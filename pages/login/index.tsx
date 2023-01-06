import { Flex, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import LoginForm from '../../components/Form/LoginForm';
import NavLink from '../../components/Nav/NavLink';
import { useResponsive } from '../../hooks/useResponsive';
import NotAuthProvider from '../../layout/NotAuthProvider';
import Page from '../../layout/Page';

type Props = {};

const Login = (props: Props) => {
  const { t } = useTranslation();
  const { isSmallDevice } = useResponsive();
  return (
    <NotAuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        title='Login'
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
            boxShadow='rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
          >
            <Text mr='0.25rem'>{t('new_to_comfysloth')}</Text>
            <NavLink
              title={t('create_an_account')}
              href='/signup'
              textProps={{ color: 'orange.400' }}
              isSpacing={false}
            />
          </Flex>
        </Flex>
      </Page>
    </NotAuthProvider>
  );
};

export default Login;
