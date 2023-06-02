import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { APP_ROUTES } from '../constant';
import Page from '../layout/Page';
import NotAuthProvider from '../layout/Provider/NotAuthProvider';

type Props = {};

const NotFound = (props: Props) => {
  const { t } = useTranslation();
  return (
    <NotAuthProvider>
      <Page
        alignItems='center'
        justifyContent='center'
        direction='column'
        minH='60vh'
        title='Not Found'
      >
        <Text fontWeight='bold' fontSize='4xl' textAlign='center'>
          404 {t('page_not_found')}
        </Text>
        <Flex mt='1rem'>
          <Link href={APP_ROUTES.home}>
            <Button colorScheme='orange'>{t('back_to_home')}</Button>
          </Link>
        </Flex>
      </Page>
    </NotAuthProvider>
  );
};

export default NotFound;
