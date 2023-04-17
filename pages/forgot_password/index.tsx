import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import ForgotPasswordForm from '../../components/Form/ForgotPasswordForm';
import { APP_ROUTES, FORM_BOX_SHADOW } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import NavLink from '../../layout/Nav/NavLink';
import Page from '../../layout/Page';
import NotAuthProvider from '../../layout/Provider/NotAuthProvider';
import { ForgotPasswordRequest } from '../../models/api/auth';
import { forgotPassword } from '../../services/auth';
import { NextApplicationPage } from '../_app';

const ForgotPassword: NextApplicationPage = () => {
  const { t } = useTranslation();
  const { isSmallDevice } = useResponsive();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  const handleForgotPassword = async (value: ForgotPasswordRequest) => {
    try {
      setIsLoading(true);
      await forgotPassword(value);
      onOpen();
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    router.push(APP_ROUTES.login);
    onClose();
  };

  return (
    <Page
      alignItems='center'
      justifyContent='center'
      direction='column'
      title={t('forgot_password')}
    >
      <Breadcrumb
        links={[
          { title: t('home'), href: APP_ROUTES.home },
          { title: t('forgot_password'), href: APP_ROUTES.forgotPassword },
        ]}
        current={t('forgot_password')}
      />
      <Flex
        mt='5rem'
        direction='column'
        minW={isSmallDevice ? '90%' : '340px'}
        minHeight='60vh'
        justifyContent='center'
      >
        <Flex mb='1rem' justifyContent='center'>
          <Text
            maxW={isSmallDevice ? '90vw' : 'unset'}
            fontSize='3xl'
            fontWeight='semibold'
            textAlign={isSmallDevice ? 'center' : 'initial'}
          >
            {t('forgot_password')}
          </Text>
        </Flex>
        <ForgotPasswordForm
          handleSubmit={handleForgotPassword}
          isLoading={isLoading}
        />
        <Flex
          mt='1rem'
          paddingY='1rem'
          borderRadius='0.5rem'
          justifyContent='center'
          alignItems='center'
          bg='transparent'
          boxShadow={FORM_BOX_SHADOW}
        >
          <NavLink
            title={t('back_to_login')}
            href={APP_ROUTES.login}
            textProps={{ color: 'orange.400' }}
            isSpacing={false}
          />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('forgot_password_success_title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text whiteSpace='pre-wrap'>
              {t('forgot_password_success_description')}
            </Text>
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button colorScheme='orange' onClick={handleCloseModal}>
              {t('ok')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Page>
  );
};

ForgotPassword.getLayout = (page: React.ReactElement) => {
  return <NotAuthProvider>{page}</NotAuthProvider>;
};

export default ForgotPassword;
