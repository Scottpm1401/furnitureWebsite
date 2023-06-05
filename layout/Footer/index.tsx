import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import SocialIcon from '../../components/SocialIcon';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import AmericanExpress from '../../public/svg/american_express.svg';
import Facebook from '../../public/svg/facebook.svg';
import Instagram from '../../public/svg/instagram.svg';
import Logo from '../../public/svg/logo.svg';
import MasterCard from '../../public/svg/master_card.svg';
import Cirrus from '../../public/svg/master_card_cirrus.svg';
import Twitter from '../../public/svg/twitter.svg';
import UnionPay from '../../public/svg/unionpay.svg';
import Visa from '../../public/svg/visa.svg';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';
import Container from '../Container';
import NavLink from '../Nav/NavLink';

type Props = {};

const Footer = (props: Props) => {
  const { t, lang } = useTranslation();
  const { isMobile } = useResponsive();
  const welcomeMess = useAppSelector(selectors.global.selectHomeFooter);

  return (
    <Container direction='column' pt='5rem'>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        w='full'
        justifyContent='space-between'
        alignItems={isMobile ? 'center' : 'initial'}
        textAlign={isMobile ? 'center' : 'start'}
        spacing={isMobile ? '2rem' : '0'}
        wrap='wrap'
      >
        <Flex direction='column' mr={isMobile ? '0' : '2rem'} maxW='260px'>
          <Flex justifyContent={isMobile ? 'center' : 'flex-start'}>
            <Link href={APP_ROUTES.home}>
              <Button variant='unstyled' h='40px'>
                <Logo id='footer_logo' />
              </Button>
            </Link>
          </Flex>

          <Text
            mt={'0.5rem'}
            fontSize='md'
            fontWeight='medium'
            lineHeight='26px'
            color='#5B5F62'
          >
            {welcomeMess.find((item) => item.lang === lang)?.content}
          </Text>
          <Flex
            mt={'0.5rem'}
            justifyContent={isMobile ? 'center' : 'flex-start'}
          >
            <SocialIcon
              href='https://www.facebook.com'
              icon={<Facebook />}
              hoverColor='rgb(56, 88, 152)'
            />

            <SocialIcon
              href='https://www.instagram.com'
              icon={
                <>
                  <svg
                    className='instargram_linear'
                    style={{ width: 0, height: 0 }}
                  >
                    <radialGradient id='rg' r='150%' cx='30%' cy='107%'>
                      <stop stopColor='#fdf497' offset='0' />
                      <stop stopColor='#fdf497' offset='0.05' />
                      <stop stopColor='#fd5949' offset='0.45' />
                      <stop stopColor='#d6249f' offset='0.6' />
                      <stop stopColor='#285AEB' offset='0.9' />
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
              href='https://twitter.com'
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
            mr='0px !important'
            mt='22px'
            title={t('visit_our_store')}
            href={APP_ROUTES.products}
            direction={isMobile ? 'center' : 'left'}
            textProps={{ color: 'black' }}
          />
          <NavLink
            mr='0px !important'
            title={t('about_us')}
            href={APP_ROUTES.about}
            direction={isMobile ? 'center' : 'left'}
            textProps={{ color: 'black' }}
          />
          <NavLink
            mr='0px !important'
            title={t('contact_us')}
            href={APP_ROUTES.contact}
            direction={isMobile ? 'center' : 'left'}
            textProps={{ color: 'black' }}
          />
          <NavLink
            mr='0px !important'
            title={t('terms_and_conditions')}
            href={APP_ROUTES.termAndCondition}
            direction={isMobile ? 'center' : 'left'}
            textProps={{ color: 'black' }}
          />
          <NavLink
            mr='0px !important'
            title={t('privacy_policy')}
            href={APP_ROUTES.privacyPolicy}
            direction={isMobile ? 'center' : 'left'}
            textProps={{ color: 'black' }}
          />
        </Flex>
        <Flex direction='column'>
          <Text fontWeight='semibold' fontSize='18px' lineHeight='18px'>
            {t('account')}
          </Text>

          <NavLink
            mr='0px !important'
            mt='22px'
            title={t('your_cart')}
            href={APP_ROUTES.cart}
            direction={isMobile ? 'center' : 'left'}
            textProps={{ color: 'black' }}
          />
          <NavLink
            mr='0px !important'
            title={t('your_orders')}
            href={APP_ROUTES.ordered}
            direction={isMobile ? 'center' : 'left'}
            textProps={{ color: 'black' }}
          />
          <NavLink
            mr='0px !important'
            title={t('settings')}
            href={APP_ROUTES.profile}
            direction={isMobile ? 'center' : 'left'}
            textProps={{ color: 'black' }}
          />
        </Flex>
        <Flex direction='column' maxW='420px'>
          <Text fontWeight='semibold' fontSize='18px' lineHeight='18px'>
            {t('payment_method')}
          </Text>
          <Text mt='1rem'>{t('payment_method_des')}</Text>
          <Flex
            justifyContent={isMobile ? 'center' : 'flex-start'}
            sx={{
              a: {
                transition: 'all 200ms ease-in-out',
                '&:hover': {
                  scale: 1.2,
                },
              },
              svg: {
                width: '60px',
              },
            }}
          >
            <Link href='https://www.mastercard.com' target='_blank'>
              <MasterCard />
            </Link>
            <Link href='https://cirrus.com' target='_blank'>
              <Cirrus style={{ marginLeft: 16 }} />
            </Link>
            <Link href='https://www.visa.com' target='_blank'>
              <Visa style={{ marginLeft: 16 }} />
            </Link>
            <Link href='https://www.americanexpress.com' target='_blank'>
              <AmericanExpress style={{ marginLeft: 16 }} />
            </Link>
            <Link href='https://www.unionpayintl.com' target='_blank'>
              <UnionPay style={{ marginLeft: 16 }} />
            </Link>
          </Flex>
        </Flex>
      </Stack>
      <Flex
        mt={isMobile ? '2.5rem' : '5rem'}
        borderTop='1px solid black'
        justifyContent='center'
      >
        <Text fontSize='sm' marginY='1rem'>
          © 2022 ComfySloth All rights reserved
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
