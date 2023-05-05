import { IconButton, Td, Th, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Table from '../../../components/Table';
import TableSkeleton from '../../../components/Table/TableSkeleton';
import { APP_ROUTES } from '../../../constant';
import { useSubscriptions } from '../../../hooks/subscription';
import CmsContainer from '../../../layout/Container/CmsContainer';
import Page from '../../../layout/Page';
import AdminAuthProvider from '../../../layout/Provider/AdminAuthProvider';
import EditIcon from '../../../public/svg/edit.svg';
import { NextApplicationPage } from '../../_app';

const CmsSubscriptions: NextApplicationPage = () => {
  const {
    total,
    isLoading,
    subscriptions,
    offset,
    limit,
    search,
    getSubscriptionsList,
    hasNext,
    hasPrevious,
  } = useSubscriptions();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='subscription List'>
        <CmsContainer
          title={t('subscription_list')}
          search={{ handleSearch: getSubscriptionsList }}
        >
          <Table
            headers={
              <Tr>
                <Th>ID</Th>
                <Th>{t('email')}</Th>
                <Th>{t('name_of_user')}</Th>
                <Th>{t('phone')}</Th>
                <Th></Th>
              </Tr>
            }
            body={
              !isLoading ? (
                subscriptions.map((subscription) => (
                  <Tr key={subscription._id}>
                    <Td>{subscription._id.slice(0, 5)}</Td>
                    <Td>{subscription.email}</Td>
                    <Td>{subscription.name}</Td>
                    <Td>{subscription.phone}</Td>
                    <Td>
                      <IconButton
                        minW='unset'
                        p='6px'
                        w='32px'
                        h='32px'
                        colorScheme='orange'
                        icon={<EditIcon />}
                        aria-label={`edit_icon_${subscription._id}`}
                        onClick={() =>
                          router.push(
                            APP_ROUTES.cms.subscriptions.index(subscription._id)
                          )
                        }
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <TableSkeleton columns={7} />
              )
            }
            tablePaginationProps={{
              labelDisplayedRows: {
                from: offset,
                to: subscriptions.length,
                count: total,
              },
              prevButtonProps: {
                disabled: !hasPrevious,
                onClick: () =>
                  getSubscriptionsList(offset - limit, limit, search),
                'aria-label': 'Prev navigation',
              },
              nextButtonProps: {
                disabled: !hasNext,
                onClick: () =>
                  getSubscriptionsList(offset + limit, limit, search),
                'aria-label': 'Next navigation',
              },
              rowsPerPage: limit,
              onChangeRowsPerPage: (rowNumber) =>
                getSubscriptionsList(0, rowNumber, search),
            }}
            csv={{
              data: subscriptions.map((subscription) => ({
                id: subscription._id,
                email: subscription.email,
                name: subscription.name,
                phone: subscription.phone,
                address: subscription.address,
              })),
              headers: [
                {
                  label: 'ID',
                  key: 'id',
                },
                {
                  label: t('email'),
                  key: 'email',
                },
                {
                  label: t('name_of_user'),
                  key: 'name',
                },
                {
                  label: t('address'),
                  key: 'address',
                },
              ],
              filename: 'subscriptions',
            }}
          />
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

CmsSubscriptions.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsSubscriptions;
