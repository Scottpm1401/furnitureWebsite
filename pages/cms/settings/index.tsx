import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import AdminAuthProvider from '../../../layout/AdminAuthProvider';
import CmsContainer from '../../../layout/CmsContainer';
import Page from '../../../layout/Page';

type Props = {};

const CmsSettings = (props: Props) => {
  const { t } = useTranslation();

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Settings'>
        <CmsContainer title={t('settings')} />
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsSettings;
