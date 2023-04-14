import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import TemplateForm from '../../../../components/Form/TemplateForm';
import { APP_ROUTES } from '../../../../constant';
import CmsContainer from '../../../../layout/Container/CmsContainer';
import Page from '../../../../layout/Page';
import AdminAuthProvider from '../../../../layout/Provider/AdminAuthProvider';
import {
  BannerFormType,
  UpdateTemplateRequest,
} from '../../../../models/api/cms';
import { TemplateType } from '../../../../models/template';
import { createTemplate } from '../../../../services/template';
import { handleUploadTemplateImage } from '../../../../utils/template';
import { NextApplicationPage } from '../../../_app';

const initialTemplate: TemplateType = {
  _id: '',
  banners: [],
  about: {
    _id: '',
    image: '',
    title: [],
    description: [],
  },
  home_footer: [],
  contact: [],
  terms_and_conditions: [],
  privacy_policy: [],
  active: false,
  title: '',
};

const CmsCreateTemplate: NextApplicationPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();

  const handleUpdateTemplate = async (values: UpdateTemplateRequest) => {
    try {
      const req = { ...values };

      const newImage = await handleUploadTemplateImage({
        uploadImg: values.about.image,
      });
      req.about.image = newImage;
      const uploadReq: Promise<BannerFormType>[] = req.banners.map(
        async (item) => {
          const newGalleryImg = await handleUploadTemplateImage({
            uploadImg: item.image,
          });
          return { ...item, image: newGalleryImg };
        }
      );
      req.banners = await Promise.all(uploadReq);
      const newProduct = await createTemplate(req);
      router.push(APP_ROUTES.cms.templates.index(newProduct._id));
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  };

  return (
    <Page direction='row' w='full' title={t('template_details')}>
      <CmsContainer
        title={t('template_details')}
        href={APP_ROUTES.cms.templates.list}
      >
        <TemplateForm
          template={initialTemplate}
          onSubmit={handleUpdateTemplate}
          create
        />
      </CmsContainer>
    </Page>
  );
};

CmsCreateTemplate.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsCreateTemplate;
