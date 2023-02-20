import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import AdminAuthProvider from '../../../layout/AdminAuthProvider';
import CmsContainer from '../../../layout/CmsContainer';

type Props = {};

const CmsProducts = (props: Props) => {
  const { t } = useTranslation();

  return (
    <AdminAuthProvider>
      <CmsContainer title={t('products_list')} />
    </AdminAuthProvider>
  );
};

export default CmsProducts;
