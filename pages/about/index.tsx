import { Button, Flex, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import Container from '../../components/Container';
import NotAuthProvider from '../../layout/NotAuthProvider';
import Page from '../../layout/Page';

type Props = {};

const About = (props: Props) => {
  const { t } = useTranslation();
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
            { title: t('home'), href: '/' },
            { title: t('about'), href: '/about' },
          ]}
          current={t('about')}
        />
        <Flex mt='4rem'>
          <Container gap='2rem' h='500px'>
            <Flex
              flex={1}
              position='relative'
              borderRadius='0.5rem'
              overflow='hidden'
            >
              <Image
                src={'/images/about_banner.jpg'}
                fill
                alt={'about_banner'}
              />
            </Flex>

            <Flex direction='column' justifyContent='flex-start' flex={1}>
              <Flex>
                <Text
                  css={css`
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
