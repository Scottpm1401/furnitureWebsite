import { Flex, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import Breadcrumb from '../../components/Breadcrumb';
import Container from '../../components/Container';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import NotAuthProvider from '../../layout/NotAuthProvider';
import Page from '../../layout/Page';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';

type Props = {};

const About = (props: Props) => {
  const { t, lang } = useTranslation();
  const { isMobile } = useResponsive();
  const aboutContent = useAppSelector(selectors.global.selectAbout);

  return (
    <NotAuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        title={t('about')}
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
            h={isMobile ? '1200px' : 'auto'}
            textAlign={isMobile ? 'center' : 'start'}
          >
            <Flex
              flex={1}
              position='relative'
              borderRadius='0.5rem'
              overflow='hidden'
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
      </Page>
    </NotAuthProvider>
  );
};

export default About;
