import { Button, Stack, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import TableDetail from '../../../../components/Table/TableDetail';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import { useProduct } from '../../../../hooks/product';
import AdminAuthProvider from '../../../../layout/AdminAuthProvider';
import CmsContainer from '../../../../layout/CmsContainer';
import Page from '../../../../layout/Page';
import { UpdateProductRequest } from '../../../../models/api/cms';

const CmsProduct = () => {
  const { product, isLoading } = useProduct();
  const { t } = useTranslation();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateUser = async (values: UpdateProductRequest) => {
    // if (!ordered) return;
    // try {
    //   setIsUpdating(true);
    //   await updateOrderedById(ordered._id, values);
    //   toast({
    //     title: t('update_ordered_success'),
    //     status: 'success',
    //     duration: 5000,
    //     position: 'top-right',
    //   });
    // } catch (error) {
    //   if (isAxiosError(error)) {
    //     toast({
    //       title:
    //         isReqError(error) ||
    //         t(error.response?.data?.message) ||
    //         error.response?.data?.error?.message,
    //       status: 'error',
    //       duration: 5000,
    //       position: 'top-right',
    //     });
    //   }
    // } finally {
    //   setIsUpdating(false);
    // }
  };

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title={t('product_details')}>
        <CmsContainer
          title={t('product_details')}
          href={APP_ROUTES.cmsProducts}
        >
          {!product || isLoading ? (
            <TableDetailSkeleton rows={7} />
          ) : (
            <Formik
              initialValues={
                {
                  ...product,
                  _id: undefined,
                } as UpdateProductRequest
              }
              onSubmit={handleUpdateUser}
              enableReinitialize
            >
              {({
                values,
                initialValues,
                handleChange,
                setFieldValue,
                handleSubmit,
                handleReset,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <TableDetail
                    rows={[
                      {
                        title: 'ID',
                        content: product._id,
                      },
                      {
                        title: t('title'),
                        content: values.title,
                      },
                      {
                        title: t('description'),
                        content: values.description,
                      },
                    ]}
                  />
                  <Stack
                    direction='row'
                    mt='2rem'
                    alignItems='center'
                    justifyContent='center'
                    spacing={8}
                  >
                    <Button
                      colorScheme='orange'
                      variant='outline'
                      onClick={handleReset}
                    >
                      {t('reset')}
                    </Button>
                    <Button
                      isLoading={isUpdating}
                      loadingText={t('updating')}
                      type='submit'
                      colorScheme='orange'
                    >
                      {t('update_ordered')}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsProduct;
