import { Button, Flex, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import Container from '../../components/Container';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/useResponsive';
import NotAuthProvider from '../../layout/NotAuthProvider';
import Page from '../../layout/Page';

type Props = {};

const About = (props: Props) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  return (
    <NotAuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        title='About'
      >
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            { title: t('about'), href: APP_ROUTES.about },
          ]}
          current={t('about')}
        />
        <Flex mt='4rem'>
          <Container
            direction={isMobile ? 'column' : 'row'}
            h={isMobile ? '1200px' : '600px'}
            textAlign={isMobile ? 'center' : 'start'}
          >
            <Flex
              flex={1}
              position='relative'
              borderRadius='0.5rem'
              overflow='hidden'
            >
              <Image
                style={{ objectFit: isMobile ? 'cover' : 'contain' }}
                src={'/images/about_banner.jpg'}
                fill
                alt={'about_banner'}
              />
            </Flex>

            <Flex
              ml={isMobile ? '0' : '2rem'}
              mt={isMobile ? '2rem' : '0'}
              direction='column'
              justifyContent='flex-start'
              flex={1}
            >
              <Flex justifyContent={isMobile ? 'center' : 'start'}>
                <Text
                  css={css`
                    ${isMobile
                      ? `display: flex;
                    flex-direction: column;
                    align-items: center;
                    `
                      : null}
                    &::after {
                      width: 50%;
                      height: 4px;
                      background: var(--chakra-colors-orange-400);
                      content: '';
                      display: block;
                    }
                  `}
                  fontWeight='semibold'
                  fontSize='3xl'
                >
                  {t('our_story')}
                </Text>
              </Flex>
              <Text
                mt='2rem'
                color='#5B5F62'
                fontWeight='medium'
                lineHeight={2}
              >
                {t('about_text')}
              </Text>
            </Flex>
          </Container>
        </Flex>
      </Page>
    </NotAuthProvider>
  );
};

export default About;
