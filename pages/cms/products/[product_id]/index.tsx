import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { difference, isEqual } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import CmsProductImage from '../../../../components/CmsProductImage';
import ColorButton from '../../../../components/ColorButton';
import TableDetail from '../../../../components/Table/TableDetail';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import { useProduct } from '../../../../hooks/product';
import AdminAuthProvider from '../../../../layout/AdminAuthProvider';
import CmsContainer from '../../../../layout/CmsContainer';
import Page from '../../../../layout/Page';
import { UpdateProductRequest } from '../../../../models/api/cms';
import {
  ProductBrand,
  ProductCategory,
  ProductColor,
} from '../../../../models/product';
import MinusIcon from '../../../../public/svg/minus.svg';
import PlusIcon from '../../../../public/svg/plus.svg';
import { updateProductById } from '../../../../services/cms';
import { getSignature, uploadImage } from '../../../../services/upload';
import { isReqError } from '../../../../utils/common';

const CmsProduct = () => {
  const { product, isLoading } = useProduct();
  const { t } = useTranslation();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProduct = async (values: UpdateProductRequest) => {
    if (!product) return;
    try {
      const req = { ...values };
      setIsUpdating(true);
      if (values.img && !isEqual(values.img, product.img)) {
        const newImage = await handleUploadProductImage(
          product.img,
          values.img
        );
        req.img = newImage;
      }
      if (values.gallery && !isEqual(values.gallery, product.gallery)) {
        for (let index = 0; index < product.gallery.length; index++) {
          if (!isEqual(product.gallery[index], values.gallery[index])) {
            const newGalleryImg = await handleUploadProductImage(
              product.gallery[index],
              values.gallery[index]
            );
            req.gallery![index] = newGalleryImg;
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
      setIsUpdating(false);
    }
  };

  const handleUploadProductImage = async (img: string, uploadImg: string) => {
    const formData = new FormData();

    const publicId = img.slice(img.indexOf('furniture'));
    formData.append('public_id', publicId);
    const { signature, timestamp } = await getSignature({
      public_id: publicId,
    });
    formData.append('file', uploadImg);
    formData.append(
      'api_key',
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ''
    );
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || ''
    );
    const { public_id, version } = await uploadImage(formData);
    return version ? `/v${version}/${public_id}` : public_id;
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
              onSubmit={handleUpdateProduct}
              enableReinitialize
            >
              {({
                values,
                initialValues,
                handleChange,
                setFieldValue,
                handleSubmit,
                handleReset,
              }) => {
                const otherColors = difference(
                  Object.values(ProductColor),
                  values.colors || []
                );

                return (
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
                          edit: {
                            inputProps: {
                              onChange: handleChange('title'),
                            },
                            isInit: initialValues.title === values.title,
                          },
                        },
                        {
                          title: t('description'),
                          content: values.description,
                          edit: {
                            inputProps: {
                              onChange: handleChange('description'),
                            },
                            isInit:
                              initialValues.description === values.description,
                          },
                        },
                        {
                          title: t('categories'),
                          content: values.category && t(values.category),
                          edit: {
                            customInput: (
                              <Select
                                value={values.category}
                                onChange={handleChange('category')}
                              >
                                {Object.values(ProductCategory).map(
                                  (category) => (
                                    <option value={category} key={category}>
                                      {t(category)}
                                    </option>
                                  )
                                )}
                              </Select>
                            ),
                            isInit: initialValues.category === values.category,
                          },
                        },
                        {
                          title: t('brand'),
                          content: values.brand && t(values.brand),
                          edit: {
                            customInput: (
                              <Select
                                value={values.brand}
                                onChange={handleChange('brand')}
                              >
                                {Object.values(ProductBrand).map((brand) => (
                                  <option value={brand} key={brand}>
                                    {t(brand)}
                                  </option>
                                ))}
                              </Select>
                            ),
                            isInit: initialValues.brand === values.brand,
                          },
                        },
                        {
                          title: t('prices'),
                          content: `$${values.price}`,
                          edit: {
                            inputProps: {
                              onChange: handleChange('price'),
                            },
                            isInit: initialValues.price === values.price,
                          },
                        },
                        {
                          title: 'Sku',
                          content: values.sku,
                          edit: {
                            inputProps: {
                              onChange: handleChange('sku'),
                            },
                            isInit: initialValues.sku === values.sku,
                          },
                        },
                        {
                          title: t('quantity'),
                          content: values.storage_quantity,
                          edit: {
                            inputProps: {
                              onChange: handleChange('storage_quantity'),
                            },
                            isInit:
                              initialValues.storage_quantity ===
                              values.storage_quantity,
                          },
                        },
                        {
                          title: t('gallery'),
                          content: (
                            <Stack
                              direction='row'
                              w='full'
                              h='230px'
                              spacing={4}
                            >
                              <CmsProductImage
                                src={values.img || ''}
                                handleChangeImage={(result) =>
                                  setFieldValue('img', result)
                                }
                              />
                              {values.gallery?.map((item) => (
                                <CmsProductImage
                                  src={item}
                                  key={item}
                                  handleChangeImage={(result) =>
                                    setFieldValue(
                                      'gallery',
                                      values.gallery?.map((img) =>
                                        img === item ? result : img
                                      )
                                    )
                                  }
                                />
                              ))}
                            </Stack>
                          ),
                        },
                        {
                          title: t('colors'),
                          content: (
                            <Stack direction='row' spacing={2}>
                              {values.colors?.map((color) => (
                                <ColorButton
                                  w='30px'
                                  h='30px'
                                  product_color={color}
                                  key={color}
                                  active={false}
                                  cursor='default'
                                  opacity={1}
                                />
                              ))}
                            </Stack>
                          ),
                          edit: {
                            customInput: (
                              <Stack direction='row' spacing={2}>
                                {values.colors?.map((color) => (
                                  <ColorButton
                                    w='30px'
                                    h='30px'
                                    hoverItem={<MinusIcon />}
                                    product_color={color}
                                    key={color}
                                    active={false}
                                    opacity={1}
                                    onClick={() =>
                                      setFieldValue(
                                        'colors',
                                        values.colors?.filter(
                                          (item) => item !== color
                                        )
                                      )
                                    }
                                  />
                                ))}
                                {otherColors.length > 0 && (
                                  <Popover>
                                    <PopoverTrigger>
                                      <IconButton
                                        w='30px'
                                        h='30px'
                                        p='4px'
                                        minW='unset'
                                        icon={<PlusIcon />}
                                        aria-label='add_color_button'
                                        colorScheme='orange'
                                        borderRadius='full'
                                        onClick={() => {}}
                                      />
                                    </PopoverTrigger>
                                    <PopoverContent w='auto'>
                                      <Stack spacing={2} padding='8px'>
                                        {otherColors.map((color) => (
                                          <ColorButton
                                            w='30px'
                                            h='30px'
                                            product_color={color}
                                            key={color}
                                            active={false}
                                            opacity={1}
                                            onClick={() =>
                                              setFieldValue(
                                                'colors',
                                                values.colors && [
                                                  ...values.colors,
                                                  color,
                                                ]
                                              )
                                            }
                                          />
                                        ))}
                                      </Stack>
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </Stack>
                            ),
                            isInit: isEqual(
                              initialValues.colors,
                              values.colors
                            ),
                          },
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
                        {t('update_product')}
                      </Button>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          )}
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default CmsProduct;
