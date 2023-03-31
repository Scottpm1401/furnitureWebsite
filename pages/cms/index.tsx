import { Select, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';

import ProductsPieChart from '../../components/Chart/ProductsPieChart';
import RevenueLineChart from '../../components/Chart/RevenueLineChart';
import TopUsersDoughnutChart from '../../components/Chart/TopUsersDoughnutChart';
import { MONTHS } from '../../constant';
import {
  useBoughtProducts,
  useRevenue,
  useTopUsers,
} from '../../hooks/analysis';
import { useResponsive } from '../../hooks/responsive';
import AdminAuthProvider from '../../layout/AdminAuthProvider';
import CmsContainer from '../../layout/CmsContainer';
import Page from '../../layout/Page';

const currentMonth = Number(moment().format('M'));

enum UserChartType {
  paid = 'user_paid',
  num_of_bought = 'user_bought',
}

const Cms = () => {
  const { t } = useTranslation();
  const { revenue } = useRevenue();
  const { boughtProducts, getBoughtProduct } = useBoughtProducts();
  const [productsSelectedMonth, setProductsSelectedMonth] =
    useState(currentMonth);
  const [usersSelectedMonth, setUsersSelectedMonth] = useState(currentMonth);
  const [userChartType, setUserChartType] = useState(UserChartType.paid);
  const { topUsers, getTopUsers } = useTopUsers();
  const { isBigScreen } = useResponsive();

  const topUsersTitle = useMemo(
    () => topUsers.map((user) => user.name),
    [topUsers]
  );
  const topUsersData = useMemo(
    () =>
      userChartType === UserChartType.paid
        ? topUsers.map((user) => user.paid)
        : topUsers.map((user) => user.bought_products_quantity),
    [topUsers, userChartType]
  );

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Dashboard' minH='100vh'>
        <CmsContainer title={t('dashboard')}>
          <Stack spacing='5rem'>
            <Stack w='full' alignItems='center'>
              <Stack w='80%' alignItems='center'>
                <Text fontWeight='semibold' fontSize='xl'>
                  {t('revenue')}
                </Text>
                <RevenueLineChart revenue={revenue} />
              </Stack>
            </Stack>

            <Stack direction='row' justifyContent='space-between'>
              <Stack w={isBigScreen ? '40%' : '30%'} alignItems='center'>
                <Stack alignItems='center' spacing={4}>
                  <Text fontWeight='semibold' fontSize='xl'>
                    {t('bought_products')}
                  </Text>
                  <Select
                    value={productsSelectedMonth}
                    onChange={(e) => {
                      getBoughtProduct(Number(e.target.value));
                      setProductsSelectedMonth(Number(e.target.value));
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
              <Stack w={isBigScreen ? '40%' : '30%'} alignItems='center'>
                <Stack alignItems='center' spacing={4}>
                  <Text fontWeight='semibold' fontSize='xl'>
                    {t('top_10_users')}
                  </Text>
                  <Stack direction='row' spacing={4}>
                    <Select
                      value={usersSelectedMonth}
                      onChange={(e) => {
                        getTopUsers(Number(e.target.value));
                        setUsersSelectedMonth(Number(e.target.value));
                      }}
                    >
                      {MONTHS.map((item, index) => (
                        <option value={index + 1} key={item}>
                          {t(item)}
                        </option>
                      ))}
                    </Select>
                    <Select
                      value={userChartType}
                      onChange={(e) => {
                        setUserChartType(e.target.value as UserChartType);
                      }}
                    >
                      <option value={UserChartType.paid}>
                        {t(UserChartType.paid)}
                      </option>
                      <option value={UserChartType.num_of_bought}>
                        {t(UserChartType.num_of_bought)}
                      </option>
                    </Select>
                  </Stack>
                </Stack>

                <TopUsersDoughnutChart
                  title={topUsersTitle}
                  data={topUsersData}
                />
              </Stack>
            </Stack>
          </Stack>
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default Cms;
