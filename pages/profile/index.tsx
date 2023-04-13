import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import GeneralProfile from '../../components/Form/Profile/General';
import { APP_ROUTES } from '../../constant';
import Page from '../../layout/Page';
import ProfileContainer from '../../layout/ProfileContainer';
import AuthProvider from '../../layout/Provider/AuthProvider';

type Props = {};

const Profile = (props: Props) => {
  const { t } = useTranslation();
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default Profile;
