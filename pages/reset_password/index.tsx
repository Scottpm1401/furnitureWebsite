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
import React, { useMemo, useState } from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import ResetPasswordForm from '../../components/Form/ResetPasswordForm';
import { APP_ROUTES, FORM_BOX_SHADOW } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import NavLink from '../../layout/Nav/NavLink';
import Page from '../../layout/Page';
import CodeProvider from '../../layout/Provider/CodeProvider';
import NotAuthProvider from '../../layout/Provider/NotAuthProvider';
import { ResetPasswordRequest } from '../../models/api/auth';
import { resetPassword } from '../../services/auth';
import { NextApplicationPage } from '../_app';

const ResetPassword: NextApplicationPage = () => {
  const { t } = useTranslation();
  const { isSmallDevice } = useResponsive();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const code = useMemo(
    () => router.query.code?.toString(),
    [router.query.code]
  );
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleCloseModal = () => {
    onClose();
    router.push(APP_ROUTES.login);
  };

  const handleResetPassword = async (
    value: Pick<ResetPasswordRequest, 'password'>
  ) => {
    if (!code) return;
    try {
      setIsLoading(true);
      await resetPassword({ password: value.password, token: code });
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

  return (
    <Page
      alignItems='center'
      justifyContent='center'
      direction='column'
      title={t('reset_password')}
    >
      <Breadcrumb
        links={[
          { title: t('home'), href: APP_ROUTES.home },
          { title: t('reset_password'), href: APP_ROUTES.resetPassword },
        ]}
        current={t('reset_password')}
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
            {t('reset_password')}
          </Text>
        </Flex>
        <ResetPasswordForm
          handleSubmit={handleResetPassword}
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
          <ModalHeader>{t('reset_password_success_title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text whiteSpace='pre-wrap'>
              {t('reset_password_success_description')}
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

ResetPassword.getLayout = (page: React.ReactElement) => {
  return (
    <NotAuthProvider>
      <CodeProvider>{page}</CodeProvider>
    </NotAuthProvider>
  );
};

export default ResetPassword;
