import { Flex, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import Breadcrumb from '../../../components/Breadcrumb';
import Container from '../../../components/Container';
import { APP_ROUTES } from '../../../constant';
import { useResponsive } from '../../../hooks/responsive';
import NotAuthProvider from '../../../layout/NotAuthProvider';
import Page from '../../../layout/Page';
import { useAppSelector } from '../../../redux/hooks';
import { selectors } from '../../../redux/reducer';

type Props = {};

const PrivacyPolicy = (props: Props) => {
  const { t, lang } = useTranslation();
  const { isMobile } = useResponsive();
  const privacyPolicy = useAppSelector(selectors.global.selectPrivacyPolicy);

  return (
    <NotAuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        title={t('privacy_policy')}
      >
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            {
              title: t('privacy_policy'),
              href: APP_ROUTES.termAndCondition,
            },
          ]}
          current={t('privacy_policy')}
        />
        <Flex mt='4rem'>
          <Container
            direction={isMobile ? 'column' : 'row'}
            h={isMobile ? '1200px' : 'auto'}
            textAlign={isMobile ? 'center' : 'start'}
          >
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
                lineHeight={2}
                whiteSpace='pre-wrap'
              >
                {privacyPolicy.find((item) => item.lang === lang)?.content}
              </Text>
            </Flex>
          </Container>
        </Flex>
      </Page>
    </NotAuthProvider>
  );
};

export default PrivacyPolicy;
