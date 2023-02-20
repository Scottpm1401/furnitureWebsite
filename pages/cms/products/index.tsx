import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import CmsContainer from '../../../layout/CmsContainer';

type Props = {};

const CmsProducts = (props: Props) => {
  const { t } = useTranslation();

  return <CmsContainer title={t('products_list')} />;
};

export default CmsProducts;
