import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import CmsContainer from '../../../layout/CmsContainer';

type Props = {};

const CmcOrdered = (props: Props) => {
  const { t } = useTranslation();

  return <CmsContainer title={t('ordered_list')} />;
};

export default CmcOrdered;
