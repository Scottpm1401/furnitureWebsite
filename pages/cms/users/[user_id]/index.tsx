import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { useUser } from '../../../../hooks/useUser';
import AdminAuthProvider from '../../../../layout/AdminAuthProvider';
import CmsContainer from '../../../../layout/CmsContainer';
import Page from '../../../../layout/Page';

type Props = {};

const CmsUser = (props: Props) => {
  const { user, isLoading } = useUser();
  const { t } = useTranslation();

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title={t('user_details')}>
        <CmsContainer title={t('user_details')}></CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsUser;
