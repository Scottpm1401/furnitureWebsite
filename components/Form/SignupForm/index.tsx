import { Button, Flex, Input, Link, Text } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Formik } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import * as Yup from 'yup';

import CustomDatePicker from '../../../components/CustomeDatePicker';
import { useAppDispatch } from '../../../redux/hooks';
import { actions } from '../../../redux/reducer';
import { signup } from '../../../services/auth';
import { getProfile } from '../../../services/user';

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

const SignupSchema = Yup.object().shape({
  displayName: Yup.string().required('Please enter your name'),
  username: Yup.string().required('Please enter username'),
  email: Yup.string().email().required('Please enter email'),
  password: Yup.string().required('Please enter password'),
  birthday: Yup.string().nullable().required('Please choose your birthday'),
});

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

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
          <Flex direction='column' w='full'>
            <Flex direction='column'>
              <Text>{t('name')}</Text>
              <Input
                mt='0.5rem'
                value={values.displayName}
                onChange={handleChange('displayName')}
              />
              {errors.displayName && touched.displayName && (
                <Text fontSize='smaller' color='red'>
                  {errors.displayName}
                </Text>
              )}
            </Flex>

            <Flex direction='column' mt='0.5rem'>
              <Text>{t('username')}</Text>
              <Input
                mt='0.5rem'
                value={values.username}
                onChange={handleChange('username')}
              />
              {errors.username && touched.username && (
                <Text fontSize='smaller' color='red'>
                  {errors.username}
                </Text>
              )}
            </Flex>

            <Flex direction='column' mt='0.5rem'>
              <Text>{t('email')}</Text>
              <Input
                mt='0.5rem'
                type='email'
                value={values.email}
                onChange={handleChange('email')}
              />
              {errors.email && touched.email && (
                <Text fontSize='smaller' color='red'>
                  {errors.email}
                </Text>
              )}
            </Flex>

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
            </Flex>

            <Button
              colorScheme='orange'
              mt='1rem'
              onClick={() => handleSubmit()}
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
        )}
      </Formik>
    </Flex>
  );
};

export default SignupForm;
