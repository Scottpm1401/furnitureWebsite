import {
  Avatar,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import * as Yup from 'yup';

import Camera from '../../../../public/svg/camera.svg';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actions, selectors } from '../../../../redux/reducer';
import { getSignature, GetSignatureType } from '../../../../services/upload';
import { updateUser, uploadUserAva } from '../../../../services/user';
import { convertToBase64 } from '../../../../utils/common';

type SecurityType = {
  currentPassword: string;
  newPassword: string;
};

const SecurityProfile = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectors.user.selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdateProfile = async (values: SecurityType) => {};

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
                  <Input
                    mt='0.5rem'
                    value={values.currentPassword}
                    onChange={handleChange('currentPassword')}
                  />
                  {errors.currentPassword && touched.currentPassword && (
                    <Text fontSize='smaller' color='red'>
                      {errors.currentPassword}
                    </Text>
                  )}
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('new_password')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.newPassword}
                    onChange={handleChange('newPassword')}
                  />
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
              ></Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default SecurityProfile;
