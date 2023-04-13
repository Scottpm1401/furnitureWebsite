import { IconButton, Td, Th, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Table from '../../../components/Table';
import TableSkeleton from '../../../components/Table/TableSkeleton';
import { APP_ROUTES } from '../../../constant';
import { useOrderedList } from '../../../hooks/ordered';
import CmsContainer from '../../../layout/CmsContainer';
import Page from '../../../layout/Page';
import AdminAuthProvider from '../../../layout/Provider/AdminAuthProvider';
import EditIcon from '../../../public/svg/edit.svg';

type Props = {};

const CmcOrdered = (props: Props) => {
  const {
    total,
    isLoading,
    orderedList,
    offset,
    limit,
    search,
    getOrderedList,
    hasNext,
    hasPrevious,
  } = useOrderedList();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title='Ordered List'>
        <CmsContainer
          title={t('ordered_list')}
          search={{ handleSearch: getOrderedList }}
        >
          <Table
            headers={
              <Tr>
                <Th>ID</Th>
                <Th>{t('name_of_user')}</Th>
                <Th>Email</Th>
                <Th>{t('status')}</Th>
                <Th>{t('total')}</Th>
                <Th>{t('payment_method')}</Th>
                <Th></Th>
              </Tr>
            }
            body={
              !isLoading ? (
                orderedList.map((ordered) => (
                  <Tr key={ordered._id}>
                    <Td>{ordered._id.slice(0, 5)}</Td>
                    <Td>{ordered.billingDetails.name}</Td>
                    <Td>{ordered.billingDetails.email}</Td>
                    <Td>{t(ordered.status)}</Td>
                    <Td>${ordered.total_bill}</Td>
                    <Td>{ordered.payment_method}</Td>
                    <Td>
                      <IconButton
                        minW='unset'
                        p='6px'
                        w='32px'
                        h='32px'
                        colorScheme='orange'
                        icon={<EditIcon />}
                        aria-label={`edit_icon_${ordered._id}`}
                        onClick={() =>
                          router.push(APP_ROUTES.cms.ordered.index(ordered._id))
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
                to: orderedList.length,
                count: total,
              },
              prevButtonProps: {
                disabled: !hasPrevious,
                onClick: () => getOrderedList(offset - limit, limit, search),
                'aria-label': 'Prev navigation',
              },
              nextButtonProps: {
                disabled: !hasNext,
                onClick: () => getOrderedList(offset + limit, limit, search),
                'aria-label': 'Next navigation',
              },
              rowsPerPage: limit,
              onChangeRowsPerPage: (rowNumber) =>
                getOrderedList(0, rowNumber, search),
            }}
          />
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

export default CmcOrdered;
