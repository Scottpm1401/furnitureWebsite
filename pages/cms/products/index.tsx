import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import AdminAuthProvider from '../../../layout/AdminAuthProvider';
import CmsContainer from '../../../layout/CmsContainer';
import Page from '../../../layout/Page';

type Props = {};

const CmsProducts = (props: Props) => {
  const { t } = useTranslation();

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Products List'>
        <CmsContainer title={t('products_list')} />
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsProducts;
