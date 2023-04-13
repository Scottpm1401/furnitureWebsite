import { Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../../components/Breadcrumb';
import SecurityProfile from '../../../components/Form/Profile/Security';
import { APP_ROUTES } from '../../../constant';
import Page from '../../../layout/Page';
import ProfileContainer from '../../../layout/ProfileContainer';
import AuthProvider from '../../../layout/Provider/AuthProvider';

type Props = {};

const AuthenticationProfile = (props: Props) => {
  const { t } = useTranslation();
  return (
    <AuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        title={t('password_and_authentication')}
      >
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            { title: t('profile'), href: APP_ROUTES.profile },
            {
              title: t('password_and_authentication'),
              href: APP_ROUTES.authentication,
            },
          ]}
          current={t('password_and_authentication')}
        />
        <ProfileContainer>
          <SecurityProfile />
        </ProfileContainer>
      </Page>
    </AuthProvider>
  );
};

export default AuthenticationProfile;
