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
import { useAppSelector } from '../../../../redux/hooks';
import { selectors } from '../../../../redux/reducer';
import { convertToBase64 } from '../../../../utils/common';

type GeneralProfileType = {
  avatar?: string;
  displayName: string;
  username: string;
};

const GeneralProfile = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectors.user.selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = (values: GeneralProfileType) => {
    if (values.avatar) {
    }
  };

  return (
    <Flex
      w='full'
      borderRadius='0.5rem'
      bg='white'
      p='1.5rem 1rem'
      alignItems='center'
      justifyContent='center'
      boxShadow='rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
    >
      <Formik
        initialValues={
          {
            avatar: user.info?.avatar
              ? `${process.env.NEXT_PUBLIC_CDN}/${user.info.avatar}`
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
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Flex w='full' direction='column'>
              <Flex position='relative' w='64px' h='64px'>
                <Avatar w='full' h='full' src={values.avatar} />
                <Flex
                  position='absolute'
                  bottom='-5px'
                  right='-4px'
                  w='28px'
                  h='28px'
                  borderRadius='full'
                  p='6px'
                  bg='white'
                  justifyContent='center'
                  alignItems='center'
                  boxShadow='2px 1px 7px'
                  cursor='pointer'
                >
                  <label htmlFor='avatar'>
                    <Camera style={{ stroke: 'black' }} />
                  </label>
                </Flex>

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
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default GeneralProfile;
