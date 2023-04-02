import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import TemplateForm from '../../../../components/Form/TemplateForm';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import { useTemplate } from '../../../../hooks/template';
import AdminAuthProvider from '../../../../layout/AdminAuthProvider';
import CmsContainer from '../../../../layout/CmsContainer';
import Page from '../../../../layout/Page';
import { UpdateTemplateRequest } from '../../../../models/api/cms';

type Props = {};

const CmsTemplate = (props: Props) => {
  const { template, isLoading, getTemplateById } = useTemplate();
  const { t } = useTranslation();

  const handleUpdateTemplate = async (values: UpdateTemplateRequest) => {};

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title={t('template_details')}>
        <CmsContainer
          title={t('template_details')}
          href={APP_ROUTES.cms.templates.list}
        >
          {!template || isLoading ? (
            <TableDetailSkeleton rows={7} />
          ) : (
            <TemplateForm template={template} onSubmit={handleUpdateTemplate} />
          )}
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsTemplate;
