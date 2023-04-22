import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { difference, isEqual } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { UpdateProductRequest } from '../../../models/api/cms';
import {
  ProductBrand,
  ProductCategory,
  ProductColor,
  ProductType,
} from '../../../models/product';
import MinusIcon from '../../../public/svg/minus.svg';
import PlusIcon from '../../../public/svg/plus.svg';
import ColorButton from '../../ColorButton';
import TableDetail from '../../Table/TableDetail';
import CmsProductImage from './CmsProductImage';
import CmsProductUpload from './CmsProductUpload';

type ProductFormProps = {
  product: ProductType;
  onSubmit: (values: UpdateProductRequest) => Promise<void>;
  create?: boolean;
};

const ProductForm = ({ product, onSubmit, create }: ProductFormProps) => {
  const { t } = useTranslation();
  const [isUpdating, setIsUpdating] = useState(false);

  const productScheme = Yup.object().shape({
    title: Yup.string().required(t('error.form.required')),
    category: Yup.string().required(t('error.form.required')),
    brand: Yup.string().required(t('error.form.required')),
    price: Yup.number().required(t('error.form.required')),
    img: Yup.string().required(t('error.form.required')),
    storage_quantity: Yup.number().required(t('error.form.required')),
    sku: Yup.string().required(t('error.form.required')),
    colors: Yup.array().min(1, t('error.form.required')),
  });

  const handleSubmit = async (values: UpdateProductRequest) => {
    try {
      setIsUpdating(true);
      await onSubmit(values);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Formik
      initialValues={
        {
          img: product.img,
          gallery: product.gallery,
          title: product.title,
          description: product.description,
          category: product.category,
          brand: product.brand,
          price: product.price,
          sku: product.sku,
          storage_quantity: product.storage_quantity,
          colors: product.colors,
        } as UpdateProductRequest
      }
      onSubmit={handleSubmit}
      validationSchema={productScheme}
      enableReinitialize
    >
      {({
        values,
        initialValues,
        handleChange,
        setFieldValue,
        handleSubmit,
        handleReset,
        errors,
        touched,
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
                  content: product._id || t('auto_generate'),
                },
                {
                  title: t('title'),
                  content: values.title,
                  edit: {
                    inputProps: {
                      onChange: handleChange('title'),
                    },
                    isInit: initialValues.title === values.title,
                    error: touched.title ? errors.title : undefined,
                  },
                },
                {
                  title: t('description'),
                  content: values.description,
                  edit: {
                    inputProps: {
                      onChange: handleChange('description'),
                    },
                    isInit: initialValues.description === values.description,
                  },
                },
                {
                  title: t('categories'),
                  content: t(values.category),
                  edit: {
                    customInput: (
                      <Select
                        value={values.category}
                        onChange={handleChange('category')}
                      >
                        {Object.values(ProductCategory).map((category) => (
                          <option value={category} key={category}>
                            {t(category)}
                          </option>
                        ))}
                      </Select>
                    ),
                    isInit: initialValues.category === values.category,
                    error: touched.category ? errors.category : undefined,
                  },
                },
                {
                  title: t('brand'),
                  content: t(values.brand),
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
                    error: touched.brand ? errors.brand : undefined,
                  },
                },
                {
                  title: t('prices'),
                  content: `$${values.price}`,
                  edit: {
                    inputProps: {
                      value: values.price,
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
                    error: touched.sku ? errors.sku : undefined,
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
                    <Stack w='full' spacing={2}>
                      <Stack direction='row' w='full' h='230px' spacing={4}>
                        {values.img ? (
                          <CmsProductImage
                            src={values.img}
                            handleChangeImage={(result) =>
                              setFieldValue('img', result)
                            }
                          />
                        ) : (
                          <CmsProductUpload
                            id='upload_img_new'
                            onChange={(result) => setFieldValue('img', result)}
                          />
                        )}

                        {values.gallery.map((item) => (
                          <CmsProductImage
                            src={item}
                            key={item}
                            handleChangeImage={(result) =>
                              setFieldValue(
                                'gallery',
                                values.gallery.map((img) =>
                                  img === item ? result : img
                                )
                              )
                            }
                            onDelete={() =>
                              setFieldValue(
                                'gallery',
                                values.gallery.filter((img) => img !== item)
                              )
                            }
                          />
                        ))}
                        {values.gallery.length < 3 && (
                          <>
                            {values.img && (
                              <CmsProductUpload
                                id='upload_new'
                                onChange={(result) =>
                                  setFieldValue('gallery', [
                                    ...values.gallery,
                                    result,
                                  ])
                                }
                              />
                            )}

                            {new Array(
                              (values.img ? 2 : 3) - values.gallery.length
                            )
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
                      {touched.img && errors.img && (
                        <Text color='red.600'>{errors.img}</Text>
                      )}
                    </Stack>
                  ),
                },
                {
                  title: t('colors'),
                  content: (
                    <Stack direction='row' spacing={2}>
                      {values.colors.map((color) => (
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
                        {values.colors.map((color) => (
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
                                values.colors.filter((item) => item !== color)
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
                                      setFieldValue('colors', [
                                        ...values.colors,
                                        color,
                                      ])
                                    }
                                  />
                                ))}
                              </Stack>
                            </PopoverContent>
                          </Popover>
                        )}
                      </Stack>
                    ),
                    isInit: isEqual(initialValues.colors, values.colors),
                    error: touched.colors
                      ? errors.colors?.toString()
                      : undefined,
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
                loadingText={create ? t('creating') : t('updating')}
                type='submit'
                colorScheme='orange'
              >
                {create ? t('create_product') : t('update_product')}
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
