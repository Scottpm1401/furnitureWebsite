import { Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import AuthProvider from '../../layout/AuthProvider';
import Page from '../../layout/Page';

type Props = {};

const Ordered = (props: Props) => {
  const { t } = useTranslation();
  return (
    <AuthProvider>
      <Page alignItems='center' justifyContent='center' direction='column'>
        <Breadcrumb
          links={[
            { title: t('home'), href: '/' },
            {
              title: t('your_ordered'),
              href: '/ordered',
            },
          ]}
          current={t('your_ordered')}
        />
      </Page>
    </AuthProvider>
  );
};

export default Ordered;
