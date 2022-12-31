import { Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../../components/Breadcrumb';
import SecurityProfile from '../../../components/Form/Profile/Security';
import AuthProvider from '../../../layout/AuthProvider';
import Page from '../../../layout/Page';
import ProfileContainer from '../../../layout/ProfileContainer';

type Props = {};

const AuthenticationProfile = (props: Props) => {
  const { t } = useTranslation();
  return (
    <AuthProvider>
      <Page alignItems='center' justifyContent='center' direction='column'>
        <Breadcrumb
          links={[
            { title: t('home'), href: '/' },
            { title: t('profile'), href: '/profile' },
            {
              title: t('password_and_authentication'),
              href: '/profile/authentication',
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
