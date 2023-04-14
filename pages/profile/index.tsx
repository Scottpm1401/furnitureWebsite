import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import GeneralProfile from '../../components/Form/Profile/General';
import { APP_ROUTES } from '../../constant';
import ProfileContainer from '../../layout/Container/ProfileContainer';
import Page from '../../layout/Page';
import AuthProvider from '../../layout/Provider/AuthProvider';

const Profile = () => {
  const { t } = useTranslation();
  return (
    <Page
      alignItems='center'
      justifyContent='center'
      direction='column'
      title={t('profile')}
    >
      <Breadcrumb
        links={[
          { title: t('home'), href: APP_ROUTES.home },
          { title: t('profile'), href: APP_ROUTES.profile },
        ]}
        current={t('profile')}
      />
      <ProfileContainer>
        <GeneralProfile />
      </ProfileContainer>
    </Page>
  );
};

Profile.getLayout = (page: React.ReactElement) => {
  return <AuthProvider>{page}</AuthProvider>;
};

export default Profile;
