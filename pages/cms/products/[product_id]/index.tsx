import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { isEqual, max } from 'lodash';
import useTranslation from 'next-translate/useTranslation';

import ProductForm from '../../../../components/Form/ProductForm';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import { useProduct } from '../../../../hooks/product';
import CmsContainer from '../../../../layout/Container/CmsContainer';
import Page from '../../../../layout/Page';
import AdminAuthProvider from '../../../../layout/Provider/AdminAuthProvider';
import { UpdateProductRequest } from '../../../../models/api/cms';
import { updateProductById } from '../../../../services/cms';
import {
  handleDeleteImage,
  isBase64Image,
  isReqError,
} from '../../../../utils/common';
import { handleUploadProductImage } from '../../../../utils/product';
import { NextApplicationPage } from '../../../_app';

const CmsProduct: NextApplicationPage = () => {
  const { product, isLoading, getProduct } = useProduct();
  const { t } = useTranslation();
  const toast = useToast();

  const handleUpdateProduct = async (values: UpdateProductRequest) => {
    if (!product) return;
    try {
      const req = { ...values };

      if (!isEqual(values.img, product.img)) {
        const newImage = await handleUploadProductImage({
          uploadImg: values.img,
          img: product.img,
        });
        req.img = newImage;
      }
      if (!isEqual(values.gallery, product.gallery)) {
        for (
          let index = 0;
          index < (max([values.gallery.length, product.gallery.length]) || 0);
          index++
        ) {
          if (!isEqual(product.gallery[index], values.gallery[index])) {
            if (!isBase64Image(values.gallery[index])) {
              if (values.gallery[index] === undefined) {
                await handleDeleteImage(product.gallery[index]);
                req.gallery = req.gallery.filter(
                  (item) => item !== req.gallery![index]
                );
              } else {
                req.gallery[index] = values.gallery[index];
              }
            } else {
              const newGalleryImg = await handleUploadProductImage({
                uploadImg: values.gallery[index],
                img: product.gallery[index],
                extra: true,
              });
              req.gallery[index] = newGalleryImg;
            }
          }
        }
      }
      await updateProductById(product._id, req);
      toast({
        title: t('update_product_success'),
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title:
            isReqError(err) ||
            t(err.response?.data?.message) ||
            err.response?.data?.error?.message,
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      }
    } finally {
      getProduct();
    }
  };

  return (
    <Page direction='row' w='full' title={t('product_details')}>
      <CmsContainer
        title={t('product_details')}
        href={APP_ROUTES.cms.products.list}
      >
        {!product || isLoading ? (
          <TableDetailSkeleton rows={7} />
        ) : (
          <ProductForm product={product} onSubmit={handleUpdateProduct} />
        )}
      </CmsContainer>
    </Page>
  );
};

CmsProduct.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsProduct;
