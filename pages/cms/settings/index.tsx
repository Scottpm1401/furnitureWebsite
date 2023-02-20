import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import CmsContainer from '../../../layout/CmsContainer';

type Props = {};

const CmsSettings = (props: Props) => {
  const { t } = useTranslation();

  return <CmsContainer title={t('settings')} />;
};

export default CmsSettings;
