import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import * as Yup from 'yup';

import { FORM_BOX_SHADOW } from '../../../constant';
import { ForgotPasswordRequest } from '../../../models/api/auth';
import CustomInput from '../../CustomInput';

type Props = {
  handleSubmit: (value: ForgotPasswordRequest) => Promise<void>;
  isLoading?: boolean;
};

const ForgotPasswordForm = ({ handleSubmit, isLoading = false }: Props) => {
  const { t } = useTranslation();

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required(t('error.form.required')),
  });

  return (
    <Flex
      w='full'
      borderRadius='0.5rem'
      bg='white'
      p='1.5rem 1rem'
      alignItems='center'
      justifyContent='center'
      boxShadow={FORM_BOX_SHADOW}
      maxW='600px'
    >
      <Formik
        initialValues={{ email: '' } as ForgotPasswordRequest}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, handleChange, touched, errors }) => (
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack w='full' spacing={6}>
              <Stack w='full' spacing={4}>
                <Text fontWeight='medium'>{t('forgot_password_title')}</Text>
                <CustomInput
                  title={t('email')}
                  textProps={{ fontWeight: 'normal' }}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.email,
                    onChange: handleChange('email'),
                    type: 'email',
                  }}
                  error={
                    errors.email &&
                    touched.email && (
                      <Text fontSize='smaller' color='red'>
                        {errors.email}
                      </Text>
                    )
                  }
                />
              </Stack>

              <Button
                colorScheme='orange'
                type='submit'
                isLoading={isLoading}
                loadingText={t('sending_email')}
              >
                {t('send_password_reset_email')}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default ForgotPasswordForm;
