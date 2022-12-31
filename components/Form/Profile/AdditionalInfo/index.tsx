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

import { UserInfoType } from '../../../../models/user';
import Camera from '../../../../public/svg/camera.svg';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actions, selectors } from '../../../../redux/reducer';
import { getSignature, GetSignatureType } from '../../../../services/upload';
import { updateUser, uploadUserAva } from '../../../../services/user';
import { convertToBase64 } from '../../../../utils/common';

type AdditionalInfoType = {
  birthday: string;
  info?: UserInfoType;
};

const AdditionalInfoProfile = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectors.user.selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdateProfile = async (values: AdditionalInfoType) => {};

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
          {t('additional_info')}
        </Text>
        <Flex mt='1rem' w='full' h='1px' bg='blackAlpha.400' />
      </Flex>
      <Formik
        initialValues={
          {
            birthday: user.birthday,
            info: user.info,
          } as AdditionalInfoType
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
                  <Text fontWeight='semibold'>{t('first_name')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.info?.first_name}
                    onChange={handleChange('info.first_name')}
                  />
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('last_name')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.info?.last_name}
                    onChange={handleChange('info.last_name')}
                  />
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('phone')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.info?.phone}
                    onChange={handleChange('info.phone')}
                  />
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('city')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.info?.address?.city}
                    onChange={handleChange('info.address.city')}
                  />
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('state')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.info?.address?.state}
                    onChange={handleChange('info.address.state')}
                  />
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('line1')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.info?.address?.line1}
                    onChange={handleChange('info.address.line1')}
                  />
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('line2')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.info?.address?.line2}
                    onChange={handleChange('info.address.line2')}
                  />
                </Flex>

                <Flex mt='2rem'>
                  <Button
                    isLoading={isLoading}
                    loadingText={t('updating')}
                    type='submit'
                    colorScheme='orange'
                  >
                    {t('update_profile')}
                  </Button>
                </Flex>
              </Flex>
              <Flex
                ml='4rem'
                mt='0.5rem'
                w='160px'
                h='160px'
                direction='column'
              ></Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default AdditionalInfoProfile;
