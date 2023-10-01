import { Button, Stack, Text } from '@chakra-ui/react';
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
    title: Yup.string().required(t('error.form.required')),
    banners: Yup.array().min(1, t('error.form.required')),
    about: Yup.object().required(t('error.form.required')),
    home_footer: Yup.array().min(1, t('error.form.required')),
    contact: Yup.array().min(1, t('error.form.required')),
    terms_and_conditions: Yup.array().min(1, t('error.form.required')),
    privacy_policy: Yup.array().min(1, t('error.form.required')),
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
          banners: template.banners,
          about: { ...template.about, _id: undefined },
          home_footer: template.home_footer,
          contact: template.contact,
          terms_and_conditions: template.terms_and_conditions,
          privacy_policy: template.privacy_policy,
          title: template.title,
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
                  <Stack>
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
                    {touched.banners && errors.banners && (
                      <Text color='red.600'>{errors.banners.toString()}</Text>
                    )}
                  </Stack>
                ),
              },
              {
                title: t('about'),
                content: (
                  <Stack>
                    <CmsTemplateBanner
                      banner={values.about}
                      key={values.about.image}
                      handleUpdate={(result) => setFieldValue('about', result)}
                    />
                    {touched.about && errors.about && (
                      <Text color='red.600'>{errors.about.toString()}</Text>
                    )}
                  </Stack>
                ),
              },
              {
                title: t('home_footer'),
                content: (
                  <Stack>
                    <CmsTemplateContent
                      contents={values.home_footer}
                      handleUpdate={(result) =>
                        setFieldValue('home_footer', result)
                      }
                    />
                    {touched.home_footer && errors.home_footer && (
                      <Text color='red.600'>
                        {errors.home_footer.toString()}
                      </Text>
                    )}
                  </Stack>
                ),
              },
              {
                title: t('contact'),
                content: (
                  <Stack>
                    <CmsTemplateContent
                      contents={values.contact}
                      handleUpdate={(result) =>
                        setFieldValue('contact', result)
                      }
                    />
                    {touched.contact && errors.contact && (
                      <Text color='red.600'>{errors.contact.toString()}</Text>
                    )}
                  </Stack>
                ),
              },
              {
                title: t('privacy_policy'),
                content: (
                  <Stack>
                    <CmsTemplateContent
                      contents={values.privacy_policy}
                      handleUpdate={(result) =>
                        setFieldValue('privacy_policy', result)
                      }
                    />
                    {touched.privacy_policy && errors.privacy_policy && (
                      <Text color='red.600'>
                        {errors.privacy_policy.toString()}
                      </Text>
                    )}
                  </Stack>
                ),
              },
              {
                title: t('terms_and_conditions'),
                content: (
                  <Stack>
                    <CmsTemplateContent
                      contents={values.terms_and_conditions}
                      handleUpdate={(result) =>
                        setFieldValue('terms_and_conditions', result)
                      }
                    />
                    {touched.terms_and_conditions &&
                      errors.terms_and_conditions && (
                        <Text color='red.600'>
                          {errors.terms_and_conditions.toString()}
                        </Text>
                      )}
                  </Stack>
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
