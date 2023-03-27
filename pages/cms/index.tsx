import { Select, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import ProductsPieChart from '../../components/Chart/ProductsPieChart';
import RevenueLineChart from '../../components/Chart/RevenueLineChart';
import { MONTHS } from '../../constant';
import { useBoughtProducts, useRevenue } from '../../hooks/analysis';
import AdminAuthProvider from '../../layout/AdminAuthProvider';
import CmsContainer from '../../layout/CmsContainer';
import Page from '../../layout/Page';

const Cms = () => {
  const { t } = useTranslation();
  const { revenue } = useRevenue();
  const { boughtProducts, getBoughtProduct } = useBoughtProducts();
  const [selectedMonth, setSelectedMonth] = useState(
    Number(moment().format('M'))
  );

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Dashboard' minH='100vh'>
        <CmsContainer title={t('dashboard')}>
          <Stack spacing={6}>
            <Stack w='full' alignItems='center'>
              <Text fontWeight='semibold' fontSize='xl'>
                {t('revenue')}
              </Text>
              <RevenueLineChart revenue={revenue} />
            </Stack>
            <Stack w='50%' alignItems='center'>
              <Stack alignItems='center' spacing={4}>
                <Text fontWeight='semibold' fontSize='xl'>
                  {t('bought_products')}
                </Text>
                <Select
                  value={selectedMonth}
                  onChange={(e) => {
                    getBoughtProduct(Number(e.target.value));
                    setSelectedMonth(Number(e.target.value));
                  }}
                >
                  {MONTHS.map((item, index) => (
                    <option value={index + 1} key={item}>
                      {t(item)}
                    </option>
                  ))}
                </Select>
              </Stack>
              <ProductsPieChart boughtProducts={boughtProducts} />
            </Stack>
          </Stack>
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default Cms;
