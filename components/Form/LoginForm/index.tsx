import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { LoginRequest } from '../../../models/api/user';
import { useAppDispatch } from '../../../redux/hooks';
import { actions } from '../../../redux/reducer';
import { login } from '../../../services/auth';
import { getProfile } from '../../../services/user';
import { validateEmail } from '../../../utils/common';
import NavLink from '../../Nav/NavLink';

type LoginFormType = {
  userinput: string;
  password: string;
};

const initValue: LoginFormType = { userinput: '', password: '' };

const LoginSchema = Yup.object().shape({
  userinput: Yup.string().required('Please enter username or email'),
  password: Yup.string().required('Please enter password'),
});

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleLogin = async (values: LoginFormType) => {
    setIsLoading(true);
    setErrorMessage(undefined);
    const { userinput, password } = values;
    const loginReq: LoginRequest = validateEmail(values.userinput)
      ? {
          email: userinput,
          password,
        }
      : {
          username: userinput,
          password,
        };
    try {
      const data = await login(loginReq);
      dispatch(actions.auth.setAuth(data));
      const userProfile = await getProfile();
      dispatch(actions.user.setUser(userProfile));
      setIsLoading(false);
      router.push('/');
    } catch (err) {
      if (isAxiosError(err)) setErrorMessage(err.response?.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Flex
      w='full'
      borderRadius='0.5rem'
      bg='orange.50'
      p='1.5rem 1rem'
      alignItems='center'
      justifyContent='center'
    >
      <Formik
        validationSchema={LoginSchema}
        initialValues={initValue}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Flex direction='column' w='full'>
            <Text>{t('username_or_email')}</Text>
            <Input
              mt='0.5rem'
              value={values.userinput}
              onChange={handleChange('userinput')}
            />
            {errors.userinput && touched.userinput && (
              <Text fontSize='smaller' color='red'>
                {errors.userinput}
              </Text>
            )}
            <Flex
              mt='0.5rem'
              justifyContent='space-between'
              alignItems='center'
            >
              <Text>{t('password')}</Text>
              <NavLink
                title={t('forgot_password')}
                href='#'
                textProps={{ color: 'blue', fontSize: 'smaller' }}
                isSpacing={false}
              />
            </Flex>
            <Input
              mt='0.5rem'
              type='password'
              value={values.password}
              onChange={handleChange('password')}
            />
            {errors.password && touched.password && (
              <Text fontSize='smaller' color='red'>
                {errors.password}
              </Text>
            )}
            <Button
              colorScheme='orange'
              mt='1rem'
              onClick={() => handleSubmit()}
              isLoading={isLoading}
              loadingText={t('signing_in')}
            >
              {t('sign_in')}
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
        )}
      </Formik>
    </Flex>
  );
};

export default LoginForm;