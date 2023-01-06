import { Button, Flex, FlexProps, Input, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { useResponsive } from '../../../hooks/useResponsive';
import ArrowRight from '../../../public/svg/arrow_right.svg';
import Refund from '../../../public/svg/refund.svg';
import Shipping from '../../../public/svg/shipping.svg';
import Container from '../../Container';
type Props = {} & FlexProps;

const Newsletter = ({ ...props }: Props) => {
  const { t } = useTranslation();
  const { isMobile, isSmallDevice } = useResponsive();

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
        <Flex alignItems='flex-end'>
          <Input
            variant='flushed'
            type='email'
            mt='1rem'
            placeholder={t('your_email')}
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
          >
            <ArrowRight
              style={{
                strokeWidth: 1.5,
              }}
            />
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Newsletter;
