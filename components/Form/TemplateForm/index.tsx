import { Button, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { isEqual } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import * as Yup from 'yup';

import { UpdateTemplateRequest } from '../../../models/api/cms';
import { TemplateType } from '../../../models/template';
import TableDetail from '../../Table/TableDetail';
import CmsCreateTemplateBanner from './CmsCreateTemplateBanner';
import CmsTemplateBanner from './CmsTemplateBanner';
import CmsTemplateContent from './CmsTemplateContent';

type TemplateFormProps = {
  template: TemplateType;
  onSubmit: (values: UpdateTemplateRequest) => Promise<void>;
  create?: boolean;
};

const TemplateForm = ({ template, onSubmit, create }: TemplateFormProps) => {
  const { t } = useTranslation();
  const [isUpdating, setIsUpdating] = useState(false);

  const templateScheme = Yup.object().shape({
    title: Yup.string().required(t('form_required')),
    banners: Yup.array().min(1, t('form_required')),
    about: Yup.object().required(t('form_required')),
    home_footer: Yup.array().min(1, t('form_required')),
    contact: Yup.array().min(1, t('form_required')),
    terms_and_conditions: Yup.array().min(1, t('form_required')),
    privacy_policy: Yup.array().min(1, t('form_required')),
  });

  const handleSubmit = async (values: UpdateTemplateRequest) => {
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
          ...template,
          _id: undefined,
        } as UpdateTemplateRequest
      }
      onSubmit={handleSubmit}
      validationSchema={templateScheme}
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
          <TableDetail
            rows={[
              {
                title: 'ID',
                content: template._id || t('auto_generate'),
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
                title: t('banners'),
                content: (
                  <Stack direction='row' spacing={4} overflow='auto'>
                    {values.banners.map((banner) => (
                      <CmsTemplateBanner
                        banner={banner}
                        key={banner.image}
                        handleUpdate={(result) =>
                          setFieldValue(
                            'banners',
                            values.banners.map((item) =>
                              item.image === banner.image ? result : item
                            )
                          )
                        }
                        onDelete={() =>
                          setFieldValue(
                            'banners',
                            values.banners.filter(
                              (item) => !isEqual(item, banner)
                            )
                          )
                        }
                      />
                    ))}
                    <CmsCreateTemplateBanner
                      onCreate={(result) =>
                        setFieldValue('banners', [...values.banners, result])
                      }
                    />
                  </Stack>
                ),
              },
              {
                title: t('about'),
                content: (
                  <CmsTemplateBanner
                    banner={values.about}
                    key={values.about.image}
                    handleUpdate={(result) => setFieldValue('about', result)}
                  />
                ),
              },
              {
                title: t('home_footer'),
                content: (
                  <CmsTemplateContent
                    contents={values.home_footer}
                    handleUpdate={(result) =>
                      setFieldValue('home_footer', result)
                    }
                  />
                ),
              },
              {
                title: t('contact'),
                content: (
                  <CmsTemplateContent
                    contents={values.contact}
                    handleUpdate={(result) => setFieldValue('contact', result)}
                  />
                ),
              },
              {
                title: t('privacy_policy'),
                content: (
                  <CmsTemplateContent
                    contents={values.privacy_policy}
                    handleUpdate={(result) =>
                      setFieldValue('privacy_policy', result)
                    }
                  />
                ),
              },
              {
                title: t('terms_and_conditions'),
                content: (
                  <CmsTemplateContent
                    contents={values.terms_and_conditions}
                    handleUpdate={(result) =>
                      setFieldValue('terms_and_conditions', result)
                    }
                  />
                ),
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
              {create ? t('create_template') : t('update_template')}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default TemplateForm;
