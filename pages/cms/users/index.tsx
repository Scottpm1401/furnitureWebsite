import { Td, Th, Tr } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import Table from '../../../components/Table';
import TableSkeleton from '../../../components/Table/TableSkeleton';
import { useUsers } from '../../../hooks/useUsers';
import AdminAuthProvider from '../../../layout/AdminAuthProvider';
import CmsContainer from '../../../layout/CmsContainer';

type Props = {};

const CmsUsers = (props: Props) => {
  const {
    total,
    isLoading,
    users,
    offset,
    limit,
    search,
    getUsers,
    hasNext,
    hasPrevious,
  } = useUsers();
  const { t } = useTranslation();

  return (
    <AdminAuthProvider>
      <CmsContainer title={t('users_list')}>
        <Table
          headers={
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Bought</Th>
            </Tr>
          }
          body={
            !isLoading ? (
              users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id.slice(0, 5)}</Td>
                  <Td>{user.displayName}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.purchase.length}</Td>
                </Tr>
              ))
            ) : (
              <TableSkeleton columns={6} />
            )
          }
          tablePaginationProps={{
            labelDisplayedRows: {
              from: offset,
              to: users.length,
              count: total,
            },
            prevButtonProps: {
              disabled: !hasPrevious,
              onClick: () => getUsers(offset - limit, limit, search),
              'aria-label': 'Prev navigation',
            },
            nextButtonProps: {
              disabled: !hasNext,
              onClick: () => getUsers(offset + limit, limit, search),
              'aria-label': 'Next navigation',
            },
            rowsPerPage: limit,
            onChangeRowsPerPage: (rowNumber) => getUsers(0, rowNumber, search),
          }}
        />
      </CmsContainer>
    </AdminAuthProvider>
  );
};

export default CmsUsers;
