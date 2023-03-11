import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { isEqual, max } from 'lodash';
import useTranslation from 'next-translate/useTranslation';

import ProductForm from '../../../../components/Form/ProductForm';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import { useProduct } from '../../../../hooks/product';
import AdminAuthProvider from '../../../../layout/AdminAuthProvider';
import CmsContainer from '../../../../layout/CmsContainer';
import Page from '../../../../layout/Page';
import { UpdateProductRequest } from '../../../../models/api/cms';
import { updateProductById } from '../../../../services/cms';
import { isBase64Image, isReqError } from '../../../../utils/common';
import {
  handleDeleteProductImage,
  handleUploadProductImage,
} from '../../../../utils/product';

const CmsProduct = () => {
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
                await handleDeleteProductImage(product.gallery[index]);
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
      getProduct();
    }
  };

  return (
    <AdminAuthProvider>
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
    </AdminAuthProvider>
  );
};

export default CmsProduct;
