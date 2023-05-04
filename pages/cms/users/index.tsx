import { IconButton, Td, Th, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import Table from '../../../components/Table';
import TableSkeleton from '../../../components/Table/TableSkeleton';
import { APP_ROUTES } from '../../../constant';
import { useUsers } from '../../../hooks/user';
import CmsContainer from '../../../layout/Container/CmsContainer';
import Page from '../../../layout/Page';
import AdminAuthProvider from '../../../layout/Provider/AdminAuthProvider';
import EditIcon from '../../../public/svg/edit.svg';
import { formatDateLong } from '../../../utils/common';
import { NextApplicationPage } from '../../_app';

const CmsUsers: NextApplicationPage = () => {
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
  const router = useRouter();

  return (
    <Page direction='row' w='full' title='Users List'>
      <CmsContainer title={t('users_list')} search={{ handleSearch: getUsers }}>
        <Table
          headers={
            <Tr>
              <Th>ID</Th>
              <Th>{t('name_of_user')}</Th>
              <Th>{t('username')}</Th>
              <Th>{t('email')}</Th>
              <Th>{t('birthday')}</Th>
              <Th>{t('role')}</Th>
              <Th></Th>
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
                  <Td>{formatDateLong(user.birthday)}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <IconButton
                      minW='unset'
                      p='6px'
                      w='32px'
                      h='32px'
                      colorScheme='orange'
                      icon={<EditIcon />}
                      aria-label={`edit_icon_${user._id}`}
                      onClick={() =>
                        router.push(APP_ROUTES.cms.users.index(user._id))
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
    </Page>
  );
};

CmsUsers.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsUsers;
