import { Stack, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import RevenueLineChart from '../../components/Chart/RevenueLineChart';
import { useRevenue } from '../../hooks/analysis';
import AdminAuthProvider from '../../layout/AdminAuthProvider';
import CmsContainer from '../../layout/CmsContainer';
import Page from '../../layout/Page';

const Cms = () => {
  const { t } = useTranslation();
  const { revenue } = useRevenue();

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Dashboard' minH='100vh'>
        <CmsContainer title={t('dashboard')}>
          <Stack w='full' alignItems='center'>
            <Text fontWeight='semibold' fontSize='xl'>
              {t('revenue')}
            </Text>
            <RevenueLineChart revenue={revenue} />
          </Stack>
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default Cms;
