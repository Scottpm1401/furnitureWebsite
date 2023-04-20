import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { APP_ROUTES, FORM_BOX_SHADOW } from '../../../constant';
import { FORM_VALIDATE } from '../../../constant/validate';
import Eye from '../../../public/svg/eye.svg';
import EyeOff from '../../../public/svg/eye_off.svg';
import { useAppDispatch } from '../../../redux/hooks';
import { actions } from '../../../redux/reducer';
import { signup } from '../../../services/auth';
import { getProfile } from '../../../services/user';
import CustomDatePicker from '../../CustomDatePicker';
import CustomInput from '../../CustomInput';

type SignupFormType = {
  displayName: string;
  username: string;
  email: string;
  password: string;
  birthday: Date | null;
};

const initValue: SignupFormType = {
  displayName: '',
  username: '',
  email: '',
  password: '',
  birthday: null,
};

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    displayName: Yup.string().required(t('error.form.required')),
    username: Yup.string().required(t('error.form.required')),
    email: Yup.string().email().required(t('error.form.required')),
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
    birthday: Yup.string().nullable().required(t('error.form.required')),
  });

  const handleSignup = async (values: SignupFormType) => {
    setIsLoading(true);
    setErrorMessage(undefined);
    try {
      const data = await signup({
        ...values,
        birthday: moment(values.birthday).format(),
      });
      dispatch(actions.auth.setAuth(data));
      const userProfile = await getProfile();
      dispatch(actions.user.setUser(userProfile));
      await router.push(APP_ROUTES.home);
    } catch (err) {
      if (isAxiosError(err)) setErrorMessage(t(err.response?.data.message));
    }
    setIsLoading(false);
  };

  return (
    <Flex
      w='full'
      borderRadius='0.5rem'
      bg='transparent'
      boxShadow={FORM_BOX_SHADOW}
      p='1.5rem 1rem'
      alignItems='center'
      justifyContent='center'
    >
      <Formik
        validationSchema={SignupSchema}
        initialValues={initValue}
        onSubmit={handleSignup}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Flex direction='column' w='full'>
              <CustomInput
                title={t('name')}
                textProps={{ fontWeight: 'normal' }}
                inputProps={{
                  mt: '0.5rem',
                  value: values.displayName,
                  onChange: handleChange('displayName'),
                }}
                error={
                  errors.displayName &&
                  touched.displayName && (
                    <Text fontSize='smaller' color='red'>
                      {errors.displayName}
                    </Text>
                  )
                }
              />

              <CustomInput
                mt='0.5rem'
                title={t('username')}
                textProps={{ fontWeight: 'normal' }}
                inputProps={{
                  mt: '0.5rem',
                  value: values.username,
                  onChange: handleChange('username'),
                }}
                error={
                  errors.username &&
                  touched.username && (
                    <Text fontSize='smaller' color='red'>
                      {errors.username}
                    </Text>
                  )
                }
              />

              <CustomInput
                mt='0.5rem'
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

              <Flex direction='column' mt='0.5rem'>
                <Text>{t('birthday')}</Text>
                <CustomDatePicker
                  mt='0.5rem'
                  currentDate={values.birthday}
                  callback={(date) => setFieldValue('birthday', date)}
                />
                {errors.birthday && touched.birthday && (
                  <Text fontSize='smaller' color='red'>
                    {errors.birthday}
                  </Text>
                )}
              </Flex>

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

              <Button
                colorScheme='orange'
                mt='1rem'
                type='submit'
                isLoading={isLoading}
                loadingText={t('creating_account')}
              >
                {t('create_account')}
              </Button>
              {errorMessage && (
                <Text
                  mt='0.5rem'
                  fontSize='smaller'
                  color='red'
                  textAlign='center'
                >
                  {errorMessage}
                </Text>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default SignupForm;
