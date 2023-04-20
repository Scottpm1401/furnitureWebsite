import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import * as Yup from 'yup';

import { FORM_BOX_SHADOW } from '../../../constant';
import { FORM_VALIDATE } from '../../../constant/validate';
import { ResetPasswordRequest } from '../../../models/api/auth';
import Eye from '../../../public/svg/eye.svg';
import EyeOff from '../../../public/svg/eye_off.svg';

type ResetPasswordFormProps = Pick<ResetPasswordRequest, 'password'>;

type Props = {
  handleSubmit: (value: ResetPasswordFormProps) => Promise<void>;
  isLoading?: boolean;
};

const ResetPasswordForm = ({ handleSubmit, isLoading = false }: Props) => {
  const { t } = useTranslation();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(
        FORM_VALIDATE.password.min,
        t('error.form.min', {
          value: FORM_VALIDATE.password.min,
          label: t('password'),
        })
      )
      .max(
        FORM_VALIDATE.password.max,
        t('error.form.max', {
          value: FORM_VALIDATE.password.max,
          label: t('password'),
        })
      )
      .required(t('error.form.required')),
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
        initialValues={{ password: '' } as ResetPasswordFormProps}
        validationSchema={resetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, handleChange, touched, errors }) => (
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack w='full' spacing={6}>
              <Stack w='full' spacing={4}>
                <Text fontWeight='medium'>{t('reset_password_title')}</Text>
                <Flex mt='0.5rem' direction='column'>
                  <Text>{t('password')}</Text>
                  <InputGroup mt='0.5rem'>
                    <Input
                      value={values.password}
                      onChange={handleChange('password')}
                      pr='32px'
                      type={isShowPassword ? 'text' : 'password'}
                    />
                    <InputRightElement width='32px' pr='8px'>
                      <Button
                        variant='unstyled'
                        size='sm'
                        minW='auto'
                        h='auto'
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        sx={{
                          svg: {
                            stroke: 'var(--chakra-colors-gray-400)',
                          },
                        }}
                      >
                        {isShowPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && touched.password && (
                    <Text fontSize='smaller' color='red'>
                      {errors.password}
                    </Text>
                  )}
                </Flex>
              </Stack>

              <Button
                colorScheme='orange'
                type='submit'
                isLoading={isLoading}
                loadingText={t('resetting_password')}
              >
                {t('reset_password')}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default ResetPasswordForm;
