import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import AdminAuthProvider from '../../../layout/AdminAuthProvider';
import CmsContainer from '../../../layout/CmsContainer';

type Props = {};

const CmsSettings = (props: Props) => {
  const { t } = useTranslation();

  return (
    <AdminAuthProvider>
      <CmsContainer title={t('settings')} />
    </AdminAuthProvider>
  );
};

export default CmsSettings;
