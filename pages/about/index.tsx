import { Flex, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import Breadcrumb from '../../components/Breadcrumb';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import Container from '../../layout/Container';
import Page from '../../layout/Page';
import NotAuthProvider from '../../layout/Provider/NotAuthProvider';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';
import { NextApplicationPage } from '../_app';

const title = 'About';
const description = 'this is About page';
const img = '/v1681371531/furniture/banners/pbpjourmaairp0pasci4.jpg';

const About = () => {
  const { t, lang } = useTranslation();
  const { isMobile } = useResponsive();
  const aboutContent = useAppSelector(selectors.global.selectAbout);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <title>{'About'}</title>
        <meta property='og:type' content='object' />
        <meta property='og:site_name' content='Comfysloth' />
        <meta
          property='og:url'
          content='https://furniture-website-nu.vercel.app/about'
        />
        <meta name='description' content={'this is About page'} />
        <meta property='og:title' content={'About'} />
        <meta property='og:description' content={'this is About page'} />
        <meta
          property='og:image'
          content={`${process.env.NEXT_PUBLIC_CDN}/v1681371531/furniture/banners/pbpjourmaairp0pasci4.jpg`}
        />
        <meta property='og:image:width' content='800' />
        <meta property='og:image:height' content='600' />
        <meta
          property='og:image:alt'
          content={
            'https://res.cloudinary.com/scottcloud/image/upload/v1671091687/furniture/banners/slider_img_1_lt3wft'
          }
        />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <Flex alignItems='center' justifyContent='center' direction='column'>
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
            minH={isMobile ? '1200px' : 'auto'}
            textAlign={isMobile ? 'center' : 'start'}
            alignItems='center'
          >
            <Flex
              w='full'
              flex={1}
              position='relative'
              borderRadius='0.5rem'
              overflow='hidden'
              minH={isMobile ? '350px' : '600px'}
              maxH={isMobile ? '350px' : '600px'}
            >
              <Image
                style={{ objectFit: 'cover' }}
                src={`${process.env.NEXT_PUBLIC_CDN}${aboutContent.image}`}
                fill
                sizes='(max-width: 768px) 100vw,
              (max-width: 1280px) 50vw,
              33vw'
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
                  {
                    aboutContent.title.find((item) => item.lang === lang)
                      ?.content
                  }
                </Text>
              </Flex>
              <Text
                mt='2rem'
                color='#5B5F62'
                fontWeight='medium'
                whiteSpace='pre-wrap'
                lineHeight={2}
              >
                {
                  aboutContent.description.find((item) => item.lang === lang)
                    ?.content
                }
              </Text>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </>
  );
};

export default About;
