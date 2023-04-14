import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { isEqual, max } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import TemplateForm from '../../../../components/Form/TemplateForm';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import { useTemplate } from '../../../../hooks/template';
import CmsContainer from '../../../../layout/Container/CmsContainer';
import Page from '../../../../layout/Page';
import AdminAuthProvider from '../../../../layout/Provider/AdminAuthProvider';
import { UpdateTemplateRequest } from '../../../../models/api/cms';
import { useAppDispatch } from '../../../../redux/hooks';
import { actions } from '../../../../redux/reducer';
import { updateTemplate } from '../../../../services/template';
import {
  handleDeleteImage,
  isBase64Image,
  isReqError,
} from '../../../../utils/common';
import { handleUploadTemplateImage } from '../../../../utils/template';
import { NextApplicationPage } from '../../../_app';

const CmsTemplate: NextApplicationPage = () => {
  const { template, isLoading, getTemplateById } = useTemplate();
  const { t } = useTranslation();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleUpdateTemplate = async (values: UpdateTemplateRequest) => {
    if (!template) return;
    try {
      const req = { ...values };

      if (!isEqual(values.about.image, template.about.image)) {
        const newImage = await handleUploadTemplateImage({
          uploadImg: values.about.image,
          img: template.about.image,
        });
        req.about.image = newImage;
      }

      if (!isEqual(values.banners, template.banners)) {
        for (
          let index = 0;
          index < (max([values.banners.length, template.banners.length]) || 0);
          index++
        ) {
          if (
            !isEqual(template.banners[index].image, values.banners[index].image)
          ) {
            if (!isBase64Image(values.banners[index].image)) {
              if (values.banners[index] === undefined) {
                await handleDeleteImage(template.banners[index].image);
                req.banners = req.banners.filter(
                  (item) => item.image !== req.banners![index].image
                );
              } else {
                req.banners[index].image = values.banners[index].image;
              }
            } else {
              const newGalleryImg = await handleUploadTemplateImage({
                uploadImg: values.banners[index].image,
                img: template.banners[index].image,
              });
              req.banners[index].image = newGalleryImg;
            }
          }
        }
      }
      const res = await updateTemplate(template._id, req);
      if (res.active) dispatch(actions.global.setTemplate(res));

      toast({
        title: t('update_template_success'),
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title:
            isReqError(error) ||
            t(error.response?.data?.message) ||
            error.response?.data?.error?.message,
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      }
    } finally {
      getTemplateById(template._id);
    }
  };

  return (
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
  );
};

CmsTemplate.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsTemplate;
