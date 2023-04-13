import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import Container from '../../components/Container';
import { APP_ROUTES, CONTACT_EMBED_MAP } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import NotAuthProvider from '../../layout/NotAuthProvider';
import Page from '../../layout/Page';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';

const Contact = () => {
  const { t, lang } = useTranslation();
  const { isMobile } = useResponsive();
  const contact = useAppSelector(selectors.global.selectContact);

  return (
    <NotAuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        title={t('contact')}
      >
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            { title: t('contact'), href: APP_ROUTES.contact },
          ]}
          current={t('contact')}
        />
        <Stack mt='4rem'>
          <Container
            direction={isMobile ? 'column' : 'row'}
            h={isMobile ? '1200px' : 'auto'}
            textAlign={isMobile ? 'center' : 'start'}
          >
            <Flex flex={1} justifyContent='center'>
              <iframe
                src={CONTACT_EMBED_MAP}
                width='600'
                height='450'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </Flex>
            <Flex
              ml={isMobile ? '0' : '2rem'}
              mt={isMobile ? '2rem' : '0'}
              direction='column'
              justifyContent='flex-start'
              flex={1}
            >
              <Text
                mt='2rem'
                color='#5B5F62'
                fontWeight='medium'
                fontSize='medium'
                whiteSpace='pre-wrap'
                lineHeight={2}
              >
                {contact.find((item) => item.lang === lang)?.content}
              </Text>
            </Flex>
          </Container>
        </Stack>
      </Page>
    </NotAuthProvider>
  );
};

export default Contact;
