import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
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
  const handleLogin = async (values: LoginFormType) => {
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
    const data = await login(loginReq);
    dispatch(actions.auth.setAuth(data));
    const userProfile = await getProfile();
    dispatch(actions.user.setUser(userProfile));
    router.push('/');
  };

  return (
    <Flex
      w='full'
      borderRadius='0.5rem'
      background='white'
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
            >
              {t('sign_in')}
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
};

export default LoginForm;
