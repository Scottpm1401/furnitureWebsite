import {
  Button,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { difference, isEqual, max } from 'lodash';
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
import UploadIcon from '../../../../public/svg/upload.svg';
import { updateProductById } from '../../../../services/cms';
import {
  destroyImage,
  getSignature,
  GetSignatureType,
  uploadImage,
} from '../../../../services/upload';
import {
  convertToBase64,
  isBase64Image,
  isReqError,
} from '../../../../utils/common';

const CmsProduct = () => {
  const { product, isLoading, getProduct } = useProduct();
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
        for (
          let index = 0;
          index < (max([values.gallery.length, product.gallery.length]) || 0);
          index++
        ) {
          if (!isEqual(product.gallery[index], values.gallery[index])) {
            if (!isBase64Image(values.gallery[index])) {
              if (values.gallery[index] === undefined) {
                await handleDeleteProductImage(product.gallery[index]);
                req.gallery = req.gallery?.filter(
                  (item) => item !== req.gallery![index]
                );
              } else {
                req.gallery![index] = values.gallery[index];
              }
            } else {
              const newGalleryImg = await handleUploadProductImage(
                values.gallery[index],
                product.gallery[index]
              );
              req.gallery![index] = newGalleryImg;
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
      setIsUpdating(false);
      getProduct();
    }
  };

  const handleDeleteProductImage = async (img: string) => {
    const formData = new FormData();
    const publicId = img.slice(img.indexOf('furniture'));
    formData.append('public_id', publicId);
    const { signature, timestamp } = await getSignature({
      public_id: publicId,
    });
    formData.append(
      'api_key',
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ''
    );
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    await destroyImage(formData);
  };

  const handleUploadProductImage = async (uploadImg: string, img?: string) => {
    const formData = new FormData();
    let signatureParam: GetSignatureType = {};
    if (img) {
      const publicId = img.slice(img.indexOf('furniture'));
      signatureParam.public_id = publicId;
      formData.append('public_id', publicId);
    } else {
      const folder = 'furniture/products/extra';
      signatureParam.folder = folder;
      formData.append('folder', folder);
    }

    const { signature, timestamp } = await getSignature(signatureParam);
    formData.append('file', uploadImg);
    formData.append(
      'api_key',
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ''
    );
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

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
                                  onDelete={() =>
                                    setFieldValue(
                                      'gallery',
                                      values.gallery?.filter(
                                        (img) => img !== item
                                      )
                                    )
                                  }
                                />
                              ))}
                              {values.gallery && values.gallery.length < 3 && (
                                <>
                                  <Stack
                                    w='full'
                                    h='full'
                                    borderRadius='0.5rem'
                                    overflow='hidden'
                                  >
                                    <Stack
                                      w='full'
                                      h='full'
                                      transition='all 300ms ease-in-out'
                                      background='blackAlpha.600'
                                      justifyContent='center'
                                      alignItems='center'
                                      gap='1rem'
                                      spacing={0}
                                    >
                                      <label htmlFor={`upload_new`}>
                                        <Stack
                                          w='40px'
                                          h='40px'
                                          p='8px'
                                          bg='whiteAlpha.400'
                                          _hover={{
                                            bg: 'whiteAlpha.600',
                                          }}
                                          transition='all 200ms ease-in-out'
                                          borderRadius='full'
                                          cursor='pointer'
                                          spacing={0}
                                        >
                                          <UploadIcon stroke='white' />
                                        </Stack>
                                      </label>

                                      <Input
                                        id={`upload_new`}
                                        display='none'
                                        type='file'
                                        accept='image/png, image/gif, image/jpeg'
                                        onChange={async (e) => {
                                          const { result } =
                                            await convertToBase64(
                                              e.target.files?.[0] as File
                                            );

                                          setFieldValue(
                                            'gallery',
                                            values.gallery && [
                                              ...values.gallery,
                                              result,
                                            ]
                                          );
                                        }}
                                      />
                                    </Stack>
                                  </Stack>
                                  {new Array(2 - values.gallery.length)
                                    .fill(0)
                                    .map((item, index) => (
                                      <Stack
                                        w='full'
                                        h='full'
                                        key={`${item}_${index}`}
                                      />
                                    ))}
                                </>
                              )}
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
