import { Select, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';

import ProductsPieChart from '../../components/Chart/ProductsPieChart';
import RevenueLineChart from '../../components/Chart/RevenueLineChart';
import TopUsersDoughnutChart from '../../components/Chart/TopUsersDoughnutChart';
import CSVButton from '../../components/CSVButton';
import { MONTHS } from '../../constant';
import {
  useBoughtProducts,
  useRevenue,
  useTopUsers,
} from '../../hooks/analysis';
import { useResponsive } from '../../hooks/responsive';
import CmsContainer from '../../layout/Container/CmsContainer';
import Page from '../../layout/Page';
import AdminAuthProvider from '../../layout/Provider/AdminAuthProvider';
import { AnalysisDate } from '../../models/analysis';
import { NextApplicationPage } from '../_app';

const currentMonth = Number(moment().format('M'));
const currentYear = Number(moment().format('Y'));
const initialDate: AnalysisDate = {
  month: currentMonth,
  year: currentYear,
};

enum UserChartType {
  paid = 'user_paid',
  num_of_bought = 'user_bought',
}

const Cms: NextApplicationPage = () => {
  const { t } = useTranslation();
  const { revenue } = useRevenue();
  const { boughtProducts, getBoughtProduct } = useBoughtProducts();
  const { topUsers, getTopUsers } = useTopUsers();
  const [productsSelectedDate, setProductsSelectedDate] = useState(initialDate);
  const [usersSelectedDate, setUsersSelectedDate] = useState(initialDate);
  const [userChartType, setUserChartType] = useState(UserChartType.paid);
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
            <Stack
              w={isBigScreen ? '40%' : '30%'}
              alignItems='center'
              spacing={4}
            >
              <Stack alignItems='center' spacing={4} textAlign='center'>
                <Text fontWeight='semibold' fontSize='xl'>
                  {t('bought_products')}
                </Text>
                <Stack w='full' direction='row' alignItems='center' spacing={4}>
                  <Select
                    value={productsSelectedDate.month}
                    onChange={(e) => {
                      const newDate = {
                        ...productsSelectedDate,
                        month: Number(e.target.value),
                      };
                      getBoughtProduct(newDate);
                      setProductsSelectedDate(newDate);
                    }}
                  >
                    {MONTHS.map((item, index) => (
                      <option value={index + 1} key={item}>
                        {t(item)}
                      </option>
                    ))}
                  </Select>
                  <Select
                    value={productsSelectedDate.year}
                    onChange={(e) => {
                      const newDate = {
                        ...productsSelectedDate,
                        year: Number(e.target.value),
                      };
                      getBoughtProduct(newDate);
                      setProductsSelectedDate(newDate);
                    }}
                  >
                    {new Array(moment().year() - 1999)
                      .fill(0)
                      .map((value, index) => (
                        <option
                          value={`${moment().year() - index}`}
                          key={`products_${value}_${index}`}
                        >{`${moment().year() - index}`}</option>
                      ))}
                  </Select>
                </Stack>
              </Stack>

              <ProductsPieChart boughtProducts={boughtProducts} />
              <CSVButton
                filename='bought_products'
                data={boughtProducts}
                headers={[
                  {
                    label: `${t('product')} ID`,
                    key: 'product_id',
                  },
                  {
                    label: t('title'),
                    key: 'title',
                  },
                  {
                    label: t('num_of_purchase'),
                    key: 'num_of_purchase',
                  },
                ]}
              />
            </Stack>
            <Stack
              w={isBigScreen ? '40%' : '30%'}
              alignItems='center'
              spacing={4}
            >
              <Stack alignItems='center' spacing={4} textAlign='center'>
                <Text fontWeight='semibold' fontSize='xl'>
                  {t('top_10_users')}
                </Text>
                <Stack direction='row' spacing={4}>
                  <Select
                    value={usersSelectedDate.month}
                    onChange={(e) => {
                      const newDate = {
                        ...usersSelectedDate,
                        month: Number(e.target.value),
                      };
                      getTopUsers(newDate);
                      setUsersSelectedDate(newDate);
                    }}
                  >
                    {MONTHS.map((item, index) => (
                      <option value={index + 1} key={item}>
                        {t(item)}
                      </option>
                    ))}
                  </Select>
                  <Select
                    value={usersSelectedDate.year}
                    onChange={(e) => {
                      const newDate = {
                        ...usersSelectedDate,
                        year: Number(e.target.value),
                      };
                      getTopUsers(newDate);
                      setUsersSelectedDate(newDate);
                    }}
                  >
                    {new Array(moment().year() - 1999)
                      .fill(0)
                      .map((value, index) => (
                        <option
                          value={`${moment().year() - index}`}
                          key={`users_${value}_${index}`}
                        >{`${moment().year() - index}`}</option>
                      ))}
                  </Select>
                </Stack>
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

              <TopUsersDoughnutChart
                title={topUsersTitle}
                data={topUsersData}
              />
              <CSVButton
                filename='bought_products'
                data={topUsers}
                headers={[
                  {
                    label: 'ID',
                    key: '_id',
                  },
                  {
                    label: t('name'),
                    key: 'name',
                  },
                  {
                    label: t('email'),
                    key: 'email',
                  },
                  {
                    label: t('phone'),
                    key: 'phone',
                  },
                  {
                    label: t('user_paid'),
                    key: 'paid',
                  },
                  {
                    label: t('num_of_purchase'),
                    key: 'bought_products_quantity',
                  },
                ]}
              />
            </Stack>
          </Stack>
        </Stack>
      </CmsContainer>
    </Page>
  );
};

Cms.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default Cms;
