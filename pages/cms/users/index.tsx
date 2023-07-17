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
import { formatDateLong, formatShortDate } from '../../../utils/common';
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
                  <Td>{t(user.role)}</Td>
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
          csv={{
            data: users.map((user) => ({
              id: user._id,
              email: user.email,
              username: user.username,
              displayName: user.displayName,
              phone: user.info?.phone,
              birthday: formatShortDate(user.birthday),
              role: t(user.role),
              first_name: user.info?.first_name,
              last_name: user.info?.last_name,
              gender: user.info?.sex ? t(user.info.sex) : undefined,
              country: user.info?.address?.country,
              city: user.info?.address?.city,
              state: user.info?.address?.state,
              line1: user.info?.address?.line1,
              line2: user.info?.address?.line2,
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
                label: t('username'),
                key: 'username',
              },
              {
                label: t('display_name'),
                key: 'displayName',
              },
              {
                label: t('phone'),
                key: 'phone',
              },
              {
                label: t('birthday'),
                key: 'birthday',
              },
              {
                label: t('role'),
                key: 'role',
              },
              {
                label: t('first_name'),
                key: 'first_name',
              },
              {
                label: t('last_name'),
                key: 'last_name',
              },
              {
                label: t('gender'),
                key: 'gender',
              },
              {
                label: t('country'),
                key: 'country',
              },
              {
                label: t('city'),
                key: 'city',
              },
              {
                label: t('state'),
                key: 'state',
              },
              {
                label: t('line1'),
                key: 'line1',
              },
              {
                label: t('line2'),
                key: 'line2',
              },
            ],
            filename: 'users',
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
