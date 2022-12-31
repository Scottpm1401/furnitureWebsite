import { Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../../components/Breadcrumb';
import AdditionalInfoProfile from '../../../components/Form/Profile/AdditionalInfo';
import Page from '../../../layout/Page';
import ProfileContainer from '../../../layout/ProfileContainer';

type Props = {};

const InfoProfile = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Page alignItems='center' justifyContent='center' direction='column'>
      <Breadcrumb
        links={[
          { title: t('home'), href: '/' },
          { title: t('profile'), href: '/profile' },
          { title: t('additional_info'), href: '/profile/additional_info' },
        ]}
        current={t('additional_info')}
      />
      <ProfileContainer>
        <AdditionalInfoProfile />
      </ProfileContainer>
    </Page>
  );
};

export default InfoProfile;
