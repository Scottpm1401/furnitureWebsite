import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';

import UserForm from '../../../../components/Form/UserForm';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import { useUser } from '../../../../hooks/user';
import CmsContainer from '../../../../layout/Container/CmsContainer';
import Page from '../../../../layout/Page';
import AdminAuthProvider from '../../../../layout/Provider/AdminAuthProvider';
import { UpdateUserRequest } from '../../../../models/api/cms';
import { updateUserById } from '../../../../services/cms';
import { isReqError } from '../../../../utils/common';
import { NextApplicationPage } from '../../../_app';

const CmsUser: NextApplicationPage = () => {
  const { user, isLoading } = useUser();
  const { t } = useTranslation();
  const toast = useToast();

  const handleUpdateUser = async (values: UpdateUserRequest) => {
    if (!user) return;
    try {
      await updateUserById(user._id, values);
      toast({
        title: t('update_user_success'),
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title:
            isReqError(err) ||
            t(err.response?.data?.message) ||
            err.response?.data?.error?.message,
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      }
    }
  };

  return (
    <Page direction='row' w='full' title={t('user_details')}>
      <CmsContainer title={t('user_details')} href={APP_ROUTES.cms.users.list}>
        {!user || isLoading ? (
          <TableDetailSkeleton rows={7} />
        ) : (
          <UserForm user={user} onSubmit={handleUpdateUser} />
        )}
      </CmsContainer>
    </Page>
  );
};

CmsUser.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};
export default CmsUser;
