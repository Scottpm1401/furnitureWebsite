import { Flex, Stack, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import Breadcrumb from '../../../components/Breadcrumb';
import Container from '../../../components/Container';
import { APP_ROUTES, FORM_BOX_SHADOW } from '../../../constant';
import { useResponsive } from '../../../hooks/responsive';
import NotAuthProvider from '../../../layout/NotAuthProvider';
import Page from '../../../layout/Page';
import CommonSideBar from '../../../layout/SideBar/CommonSideBar';
import { settingType } from '../../../models/common';
import PrivacyIcon from '../../../public/svg/privacy_policy.svg';
import TermsAndConditionsIcon from '../../../public/svg/terms_and_conditions.svg';
import { useAppSelector } from '../../../redux/hooks';
import { selectors } from '../../../redux/reducer';

const settingList: settingType[] = [
  {
    title: 'terms_and_conditions',
    path: APP_ROUTES.termAndCondition,
    icon: <TermsAndConditionsIcon />,
  },
  {
    title: 'privacy_policy',
    path: APP_ROUTES.privacyPolicy,
    icon: <PrivacyIcon />,
  },
];

const PrivacyPolicy = () => {
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
            h={isMobile ? '1200px' : 'auto'}
            textAlign={isMobile ? 'center' : 'start'}
          >
            <Stack direction={isMobile ? 'column' : 'row'} spacing={4}>
              <CommonSideBar settings={settingList} />
              <Flex
                ml={isMobile ? '0' : '2rem'}
                direction='column'
                justifyContent='flex-start'
                flex={1}
                p='2rem'
                borderRadius='8px'
                bg='white'
                boxShadow={FORM_BOX_SHADOW}
              >
                <Text
                  color='#5B5F62'
                  fontWeight='medium'
                  fontSize='medium'
                  lineHeight={2}
                  whiteSpace='pre-wrap'
                >
                  {privacyPolicy.find((item) => item.lang === lang)?.content}
                </Text>
              </Flex>
            </Stack>
          </Container>
        </Flex>
      </Page>
    </NotAuthProvider>
  );
};

export default PrivacyPolicy;
