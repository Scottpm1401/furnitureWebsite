import { Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../../components/Breadcrumb';
import AdditionalInfoProfile from '../../../components/Form/Profile/AdditionalInfo';
import { APP_ROUTES } from '../../../constant';
import ProfileContainer from '../../../layout/Container/ProfileContainer';
import Page from '../../../layout/Page';
import AuthProvider from '../../../layout/Provider/AuthProvider';

type Props = {};

const InfoProfile = (props: Props) => {
  const { t } = useTranslation();
  return (
    <AuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        title={t('additional_info')}
      >
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            { title: t('profile'), href: APP_ROUTES.profile },
            { title: t('additional_info'), href: APP_ROUTES.additionalInfo },
          ]}
          current={t('additional_info')}
        />
        <ProfileContainer>
          <AdditionalInfoProfile />
        </ProfileContainer>
      </Page>
    </AuthProvider>
  );
};

export default InfoProfile;
