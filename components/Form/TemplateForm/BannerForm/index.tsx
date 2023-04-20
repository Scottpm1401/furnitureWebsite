import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import * as Yup from 'yup';

import { BannerFormType } from '../../../../models/api/cms';
import UploadIcon from '../../../../public/svg/upload.svg';
import { convertToBase64, isBase64Image } from '../../../../utils/common';
import CmsTemplateContent from '../CmsTemplateContent';

type BannerFormProps = {
  banner?: BannerFormType;
  onSubmit: (values: BannerFormType) => void;
};

const initialValues: BannerFormType = {
  image: '',
  title: [],
  description: [],
};

const BannerForm = ({ banner, onSubmit }: BannerFormProps) => {
  const { t } = useTranslation();
  const bannerSchema = Yup.object().shape({
    image: Yup.string().required(t('error.form.required')),
    title: Yup.array().min(1, t('error.form.required')),
    description: Yup.array().min(1, t('error.form.required')),
  });

  const handleSubmit = async (values: BannerFormType) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={banner || initialValues}
      onSubmit={handleSubmit}
      validationSchema={bannerSchema}
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <Stack w='full' spacing={4}>
            <Stack
              w='full'
              h='260px'
              transition='all 300ms ease-in-out'
              background='blackAlpha.600'
              justifyContent='center'
              alignItems='center'
              borderRadius='0.5rem'
              gap='1rem'
              spacing={0}
              position='relative'
              overflow='hidden'
            >
              <label htmlFor='upload_banner'>
                {!!values.image ? (
                  <Image
                    src={
                      isBase64Image(values.image)
                        ? values.image
                        : `${process.env.NEXT_PUBLIC_CDN}${values.image}`
                    }
                    style={{ cursor: 'pointer' }}
                    fill
                    alt={values.image}
                    sizes='(max-width: 768px) 100vw,
              (max-width: 1280px) 50vw,
              33vw'
                  />
                ) : (
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
                )}
              </label>

              <Input
                id='upload_banner'
                display='none'
                type='file'
                accept='image/png, image/gif, image/jpeg'
                onChange={async (e) => {
                  const { result } = await convertToBase64(
                    e.target.files?.[0] as File
                  );
                  setFieldValue('image', result);
                }}
              />
            </Stack>
            <Stack>
              <CmsTemplateContent
                contents={values.title}
                handleUpdate={(result) => setFieldValue('title', result)}
                title={t('title')}
              />
              <CmsTemplateContent
                contents={values.description}
                handleUpdate={(result) => setFieldValue('description', result)}
                title={t('description')}
              />
            </Stack>
            <Button type='submit' colorScheme='orange'>
              {t('update')}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default BannerForm;
