import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import GeneralProfile from '../../components/Form/Profile/General';
import Page from '../../layout/Page';

type Props = {};

const Profile = (props: Props) => {
  const { t } = useTranslation();
  return (
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
      <GeneralProfile />
    </Page>
  );
};

export default Profile;
