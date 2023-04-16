import {
  Button,
  Flex,
  FlexProps,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import * as Yup from 'yup';

import { useResponsive } from '../../../hooks/responsive';
import Container from '../../../layout/Container';
import { SubscribeRequest } from '../../../models/subscription';
import ArrowRight from '../../../public/svg/arrow_right.svg';
import Refund from '../../../public/svg/refund.svg';
import Shipping from '../../../public/svg/shipping.svg';
import { userSubscribe } from '../../../services/subscription';

type Props = {} & FlexProps;

const Newsletter = ({ ...props }: Props) => {
  const { t } = useTranslation();
  const { isMobile, isSmallDevice } = useResponsive();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const subscribeSchema = Yup.object().shape({
    email: Yup.string().email().required(t('form_required')),
  });

  const handleSubscribe = async (value: SubscribeRequest) => {
    try {
      await userSubscribe(value);
      onOpen();
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  };

  return (
    <Container
      display='grid'
      gridTemplateColumns={isMobile ? '1fr' : '30% 30% 40%'}
      alignItems='center'
      justifyContent='center'
      border='1px solid rgb(65, 64, 66)'
      p={isSmallDevice ? '1rem 1.75rem' : isMobile ? '2rem 3rem' : '5rem 8rem'}
      borderRadius='1rem'
      {...props}
    >
      <Flex
        mr={isMobile ? '0' : '2rem'}
        mb={isMobile ? '1rem' : '0'}
        alignItems='center'
      >
        <Flex w='3rem' h='3rem' justifyContent='center' alignItems='center'>
          <Refund />
        </Flex>
        <Flex ml='1rem' direction='column'>
          <Text fontWeight='semibold' fontSize='18px'>
            {t('20_days')}
          </Text>
          <Text mt='0.5rem'>{t('20_days_des')}</Text>
        </Flex>
      </Flex>
      <Flex
        mr={isMobile ? '0' : '2rem'}
        mb={isMobile ? '1rem' : '0'}
        alignItems='center'
      >
        <Flex w='3rem' h='3rem' justifyContent='center' alignItems='center'>
          <Shipping />
        </Flex>
        <Flex ml='1rem' direction='column'>
          <Text fontWeight='semibold' fontSize='18px'>
            {t('free_shipping')}
          </Text>
          <Text mt='0.5rem'>{t('free_shipping_des')}</Text>
        </Flex>
      </Flex>
      <Flex direction='column'>
        <Text fontWeight='semibold' fontSize='1.5rem'>
          {t('signup_newsletter')}
        </Text>
        <Formik
          initialValues={{ email: '' } as SubscribeRequest}
          validationSchema={subscribeSchema}
          onSubmit={handleSubscribe}
        >
          {({ handleSubmit, values, handleChange, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Flex alignItems='flex-end'>
                  <Input
                    variant='flushed'
                    type='email'
                    mt='1rem'
                    placeholder={t('your_email')}
                    _focusVisible={{ boxShadow: 'none !important' }}
                    value={values.email}
                    onChange={handleChange('email')}
                  />
                  <Button
                    css={css`
                      svg {
                        transition: all 200ms ease-in-out;
                      }
                      &:hover svg {
                        transform: translateX(10px);
                      }
                    `}
                    variant='unstyled'
                    w='24px'
                    h='24px'
                    type='submit'
                  >
                    <ArrowRight
                      style={{
                        strokeWidth: 1.5,
                      }}
                    />
                  </Button>
                </Flex>
                {errors.email && touched.email && (
                  <Text fontSize='smaller' color='red'>
                    {errors.email}
                  </Text>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('subscribe_success_title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text whiteSpace='pre-wrap'>
              {t('subscribe_success_description')}
            </Text>
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button colorScheme='orange' onClick={onClose}>
              {t('ok')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Newsletter;
