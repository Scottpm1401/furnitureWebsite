import { Button, Flex, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Facebook from '../../public/svg/facebook.svg';
import Instagram from '../../public/svg/instagram.svg';
import Logo from '../../public/svg/logo.svg';
import MasterCard from '../../public/svg/master_card.svg';
import Cirrus from '../../public/svg/master_card_cirrus.svg';
import Twitter from '../../public/svg/twitter.svg';
import Visa from '../../public/svg/visa.svg';
import Container from '../Container';
import NavLink from '../Nav/NavLink';
import SocialIcon from '../SocialIcon';
type Props = {};

const Footer = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Container pt='5rem' direction={'row'} justifyContent='space-between'>
      <Flex direction='column' mr='2rem' maxW='260px'>
        <Flex>
          <Button variant='unstyled' h='40px'>
            <Logo />
          </Button>
        </Flex>

        <Text
          mt={'0.5rem'}
          fontSize='md'
          fontWeight='medium'
          lineHeight='26px'
          color='#5B5F62'
        >
          {t('footer_welcome')}
        </Text>
        <Flex mt={'0.5rem'}>
          <SocialIcon icon={<Facebook />} hoverColor='rgb(56, 88, 152)' />

          <SocialIcon
            icon={
              <>
                <svg
                  className='instargram_linear'
                  style={{ width: 0, height: 0 }}
                >
                  <radialGradient id='rg' r='150%' cx='30%' cy='107%'>
                    <stop stop-color='#fdf497' offset='0' />
                    <stop stop-color='#fdf497' offset='0.05' />
                    <stop stop-color='#fd5949' offset='0.45' />
                    <stop stop-color='#d6249f' offset='0.6' />
                    <stop stop-color='#285AEB' offset='0.9' />
                  </radialGradient>
                </svg>
                <Instagram />
              </>
            }
            hoverColor='url(#rg)'
            strokeColor='white'
            ml='14px'
          />
          <SocialIcon
            icon={<Twitter />}
            hoverColor='rgb(29, 161, 242)'
            ml='14px'
          />
        </Flex>
      </Flex>
      <Flex direction='column'>
        <Text fontWeight='semibold' fontSize='18px' lineHeight='18px'>
          {t('need_help')}
        </Text>

        <NavLink
          mr='0px'
          mt='22px'
          title={t('visit_our_store')}
          href='/product'
          direction='left'
          textProps={{ color: 'black' }}
        />
        <NavLink
          mr='0px'
          title={t('about_us')}
          href='/about'
          direction='left'
          textProps={{ color: 'black' }}
        />
        <NavLink
          mr='0px'
          title={t('contact_us')}
          href='/contact'
          direction='left'
          textProps={{ color: 'black' }}
        />
        <NavLink
          mr='0px'
          title={t('terms_and_conditions')}
          href='/legal/terms_and_conditions'
          direction='left'
          textProps={{ color: 'black' }}
        />
        <NavLink
          mr='0px'
          title={t('privacy_policy')}
          href='/legal/privacy_policy'
          direction='left'
          textProps={{ color: 'black' }}
        />
      </Flex>

      <Flex direction='column'>
        <Text fontWeight='semibold' fontSize='18px' lineHeight='18px'>
          {t('account')}
        </Text>

        <NavLink
          mr='0px'
          mt='22px'
          title={t('your_cart')}
          href='/user/cart'
          direction='left'
          textProps={{ color: 'black' }}
        />
        <NavLink
          mr='0px'
          title={t('your_orders')}
          href='/user/purchase'
          direction='left'
          textProps={{ color: 'black' }}
        />
        <NavLink
          mr='0px'
          title={t('settings')}
          href='/user/profile'
          direction='left'
          textProps={{ color: 'black' }}
        />
      </Flex>
      <Flex direction='column' maxW='420px'>
        <Text fontWeight='semibold' fontSize='18px' lineHeight='18px'>
          {t('payment_method')}
        </Text>
        <Text mt='1rem'>{t('payment_method_des')}</Text>
        <Flex
          css={css`
            svg {
              width: 60px;
            }
          `}
        >
          <MasterCard />
          <Cirrus style={{ marginLeft: 16 }} />
          <Visa style={{ marginLeft: 16 }} />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
