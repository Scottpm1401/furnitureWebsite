import { Avatar, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useResponsive } from '../../../../hooks/responsive';
import Camera from '../../../../public/svg/camera.svg';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actions, selectors } from '../../../../redux/reducer';
import {
  getSignature,
  GetSignatureType,
  uploadImage,
} from '../../../../services/upload';
import { updateUser } from '../../../../services/user';
import { convertToBase64 } from '../../../../utils/common';
import CustomInput from '../../../CustomInput';

type GeneralProfileType = {
  avatar?: string;
  displayName: string;
  username: string;
};

const GeneralProfile = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectors.user.selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isMobile } = useResponsive();

  const handleUpdateProfile = async (values: GeneralProfileType) => {
    try {
      setIsLoading(true);
      if (values.avatar) {
        const formData = new FormData();
        let signatureParam: GetSignatureType = {};
        if (user.info?.avatar) {
          const publicId = user.info.avatar.slice(
            user.info.avatar.indexOf('furniture')
          );
          signatureParam.public_id = publicId;
          formData.append('public_id', publicId);
        } else {
          const folder = 'furniture/users';
          signatureParam.folder = folder;
          formData.append('folder', folder);
        }
        const { signature, timestamp } = await getSignature(signatureParam);
        formData.append('file', values.avatar);
        formData.append(
          'api_key',
          process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ''
        );
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        const { public_id, version } = await uploadImage(formData);
        const updatedUser = await updateUser({
          username: values.username,
          displayName: values.displayName,
          info: {
            ...user.info,
            avatar: version ? `/v${version}/${public_id}` : public_id,
          },
        });
        dispatch(actions.user.setUser(updatedUser));
      } else {
        const updatedUser = await updateUser({
          username: values.username,
          displayName: values.displayName,
        });
        dispatch(actions.user.setUser(updatedUser));
      }
      toast({
        title: t('update_profile_success'),
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.error.message
            ? t('error.upload_size')
            : error.response?.data.message,
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      }
    } finally {
      setIsLoading(false);
    }
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
          {t('public_profile')}
        </Text>
        <Flex mt='1rem' w='full' h='1px' bg='blackAlpha.400' />
      </Flex>
      <Formik
        initialValues={
          {
            avatar: user.info?.avatar
              ? `${process.env.NEXT_PUBLIC_CDN}${user.info.avatar}`
              : undefined,
            displayName: user.displayName,
            username: user.username,
          } as GeneralProfileType
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
            <Flex w='full' direction={isMobile ? 'column-reverse' : 'row'}>
              <Flex w='full' direction='column'>
                <CustomInput
                  title={t('email')}
                  inputProps={{
                    mt: '0.5rem',
                    value: user.email,
                  }}
                  disabled
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('name')}
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
                  mt='1.5rem'
                  title={t('username')}
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
                ml={isMobile ? '0' : '4rem'}
                mb={isMobile ? '2rem' : '0'}
                direction='column'
              >
                <Text fontWeight='semibold'>{t('profile_picture')}</Text>
                <Flex mt='0.5rem' position='relative' w='160px' h='160px'>
                  <Avatar
                    w='full'
                    h='full'
                    name={values?.displayName}
                    src={values.avatar}
                  />
                  <label htmlFor='avatar'>
                    <Flex
                      position='absolute'
                      bottom='0'
                      right='4px'
                      w='40px'
                      h='40px'
                      borderRadius='full'
                      p='8px'
                      bg='white'
                      justifyContent='center'
                      alignItems='center'
                      boxShadow='2px 1px 7px'
                      _hover={{ opacity: 0.9 }}
                      cursor='pointer'
                    >
                      <Camera style={{ stroke: 'black', cursor: 'pointer' }} />
                    </Flex>
                  </label>

                  <Input
                    id='avatar'
                    display='none'
                    type='file'
                    accept='image/png, image/gif, image/jpeg'
                    onChange={async (e) => {
                      const { result } = await convertToBase64(
                        e.target.files?.[0] as File
                      );
                      setFieldValue('avatar', result);
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default GeneralProfile;
