import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import * as Yup from 'yup';

import { FORM_VALIDATE } from '../../../../constant/validate';
import { useResponsive } from '../../../../hooks/responsive';
import Eye from '../../../../public/svg/eye.svg';
import EyeOff from '../../../../public/svg/eye_off.svg';
import { useAppDispatch } from '../../../../redux/hooks';
import { actions } from '../../../../redux/reducer';
import { changePassword } from '../../../../services/auth';

type SecurityType = {
  currentPassword: string;
  newPassword: string;
};

const SecurityProfile = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isShowPassword1, setIsShowPassword1] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const { isMobile } = useResponsive();

  const authenticationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(t('error.form.required')),
    newPassword: Yup.string()
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

  const handleUpdateProfile = async (values: SecurityType) => {
    setIsLoading(true);
    try {
      const data = await changePassword({
        password: values.currentPassword,
        newPassword: values.newPassword,
      });
      dispatch(actions.auth.setAuth(data));
      toast({
        title: t('update_password_success'),
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <Flex
      w='full'
      borderRadius='0.5rem'
      alignItems='center'
      justifyContent='center'
      direction='column'
    >
      <Flex direction='column' w='full'>
        <Text fontSize='xl' fontWeight='bold'>
          {t('password_and_authentication')}
        </Text>
        <Flex mt='1rem' w='full' h='1px' bg='blackAlpha.400' />
      </Flex>
      <Formik
        initialValues={
          {
            currentPassword: '',
            newPassword: '',
          } as SecurityType
        }
        validationSchema={authenticationSchema}
        onSubmit={handleUpdateProfile}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <Form
            style={{ width: '100%', marginTop: '1rem' }}
            onSubmit={handleSubmit}
          >
            <Flex w='full'>
              <Flex w='full' direction='column'>
                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('current_password')}</Text>
                  <InputGroup mt='0.5rem'>
                    <Input
                      value={values.currentPassword}
                      onChange={handleChange('currentPassword')}
                      pr='32px'
                      type={isShowPassword1 ? 'text' : 'password'}
                    />
                    <InputRightElement width='32px' pr='8px'>
                      <Button
                        variant='unstyled'
                        size='sm'
                        minW='auto'
                        h='auto'
                        onClick={() => setIsShowPassword1(!isShowPassword1)}
                        sx={{
                          svg: {
                            stroke: 'var(--chakra-colors-gray-400)',
                          },
                        }}
                      >
                        {isShowPassword1 ? <EyeOff /> : <Eye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.currentPassword && touched.currentPassword && (
                    <Text fontSize='smaller' color='red'>
                      {errors.currentPassword}
                    </Text>
                  )}
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('new_password')}</Text>
                  <InputGroup mt='0.5rem'>
                    <Input
                      value={values.newPassword}
                      onChange={handleChange('newPassword')}
                      pr='32px'
                      type={isShowPassword2 ? 'text' : 'password'}
                    />
                    <InputRightElement width='32px' pr='8px'>
                      <Button
                        variant='unstyled'
                        size='sm'
                        minW='auto'
                        h='auto'
                        onClick={() => setIsShowPassword2(!isShowPassword2)}
                        sx={{
                          svg: {
                            stroke: 'var(--chakra-colors-gray-400)',
                          },
                        }}
                      >
                        {isShowPassword2 ? <EyeOff /> : <Eye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.newPassword && touched.newPassword && (
                    <Text fontSize='smaller' color='red'>
                      {errors.newPassword}
                    </Text>
                  )}
                </Flex>

                <Flex mt='2rem'>
                  <Button
                    isLoading={isLoading}
                    loadingText={t('updating')}
                    type='submit'
                    colorScheme='orange'
                  >
                    {t('update_password')}
                  </Button>
                </Flex>
              </Flex>
              <Flex
                ml='4rem'
                mt='0.5rem'
                direction='column'
                w='160px'
                h='160px'
                display={isMobile ? 'none' : 'flex'}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default SecurityProfile;
