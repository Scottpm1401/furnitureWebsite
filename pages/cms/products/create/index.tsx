import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import ProductForm from '../../../../components/Form/ProductForm';
import { APP_ROUTES } from '../../../../constant';
import AdminAuthProvider from '../../../../layout/AdminAuthProvider';
import CmsContainer from '../../../../layout/CmsContainer';
import Page from '../../../../layout/Page';
import { UpdateProductRequest } from '../../../../models/api/cms';
import { ProductType } from '../../../../models/product';
import { createProduct } from '../../../../services/cms';
import { handleUploadProductImage } from '../../../../utils/product';

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

const CmsCreateProduct = () => {
  const { t } = useTranslation();
  const router = useRouter();

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
      console.log(err);
    }
  };

  return (
    <AdminAuthProvider>
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
    </AdminAuthProvider>
  );
};

export default CmsCreateProduct;
