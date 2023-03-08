import { Flex, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import SignupForm from '../../components/Form/SignupForm';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import NavLink from '../../layout/Nav/NavLink';
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
        title='Sign up'
      >
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            { title: t('sign_up'), href: APP_ROUTES.signup },
          ]}
          current={t('sign_up')}
        />
        <Flex
          mt='5rem'
          direction='column'
          minW={isSmallDevice ? '90%' : '400px'}
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
            bg='transparent'
            boxShadow='rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
          >
            <NavLink
              title={t('already_have_an_account')}
              href={APP_ROUTES.login}
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
