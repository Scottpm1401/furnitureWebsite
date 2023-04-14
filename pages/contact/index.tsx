import { Flex, Stack, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import Breadcrumb from '../../components/Breadcrumb';
import { APP_ROUTES, CONTACT_EMBED_MAP, FORM_BOX_SHADOW } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import Container from '../../layout/Container';
import Page from '../../layout/Page';
import NotAuthProvider from '../../layout/Provider/NotAuthProvider';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';
import { NextApplicationPage } from '../_app';

const Contact: NextApplicationPage = () => {
  const { t, lang } = useTranslation();
  const { isTabletOrLaptop, isMobileOrTablet } = useResponsive();
  const contact = useAppSelector(selectors.global.selectContact);

  return (
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
        <Container>
          <Stack
            w='full'
            direction={isMobileOrTablet ? 'column' : 'row'}
            textAlign={isMobileOrTablet ? 'center' : 'start'}
            spacing={4}
          >
            <Flex flex={1} justifyContent='center'>
              <iframe
                style={{
                  width: isTabletOrLaptop ? '600px' : '700px',
                  height: '450px',
                  borderRadius: '1rem',
                }}
                src={CONTACT_EMBED_MAP}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </Flex>
            <Flex
              direction='column'
              justifyContent='flex-start'
              flex={1}
              borderRadius='8px'
              bg='white'
              boxShadow={FORM_BOX_SHADOW}
              p='2rem'
            >
              <Text
                fontWeight='semibold'
                fontSize='xl'
                whiteSpace='pre-wrap'
                lineHeight={2}
              >
                {contact.find((item) => item.lang === lang)?.content}
              </Text>
            </Flex>
          </Stack>
        </Container>
      </Stack>
    </Page>
  );
};

Contact.getLayout = (page: React.ReactElement) => {
  return <NotAuthProvider>{page}</NotAuthProvider>;
};

export default Contact;
