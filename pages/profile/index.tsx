import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import GeneralProfile from '../../components/Form/Profile/General';
import AuthProvider from '../../layout/AuthProvider';
import Page from '../../layout/Page';
import ProfileContainer from '../../layout/ProfileContainer';

type Props = {};

const Profile = (props: Props) => {
  const { t } = useTranslation();
  return (
    <AuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        title='Profile'
      >
        <Breadcrumb
          links={[
            { title: t('home'), href: '/' },
            { title: t('profile'), href: '/profile' },
          ]}
          current={t('profile')}
        />
        <ProfileContainer>
          <GeneralProfile />
        </ProfileContainer>
      </Page>
    </AuthProvider>
  );
};

export default Profile;
