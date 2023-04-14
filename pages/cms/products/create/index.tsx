import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import ProductForm from '../../../../components/Form/ProductForm';
import { APP_ROUTES } from '../../../../constant';
import CmsContainer from '../../../../layout/Container/CmsContainer';
import Page from '../../../../layout/Page';
import AdminAuthProvider from '../../../../layout/Provider/AdminAuthProvider';
import { UpdateProductRequest } from '../../../../models/api/cms';
import { ProductType } from '../../../../models/product';
import { createProduct } from '../../../../services/cms';
import { handleUploadProductImage } from '../../../../utils/product';
import { NextApplicationPage } from '../../../_app';

const initialProduct: ProductType = {
  _id: '',
  img: '',
  gallery: [],
  title: '',
  category: '',
  brand: '',
  price: 0,
  sku: '',
  storage_quantity: 0,
  colors: [],
};

const CmsCreateProduct: NextApplicationPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();

  const handleCreateProduct = async (values: UpdateProductRequest) => {
    try {
      const req = { ...values };
      const newImage = await handleUploadProductImage({
        uploadImg: values.img,
      });
      req.img = newImage;
      const uploadReq = req.gallery.map(async (item) => {
        const newGalleryImg = await handleUploadProductImage({
          uploadImg: item,
          extra: true,
        });
        return newGalleryImg;
      });
      req.gallery = await Promise.all(uploadReq);
      const newProduct = await createProduct(req);
      router.push(APP_ROUTES.cms.products.index(newProduct._id));
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
    <Page direction='row' w='full' title={t('product_details')}>
      <CmsContainer
        title={t('product_details')}
        href={APP_ROUTES.cms.products.list}
      >
        <ProductForm
          product={initialProduct}
          onSubmit={handleCreateProduct}
          create
        />
      </CmsContainer>
    </Page>
  );
};

CmsCreateProduct.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsCreateProduct;
