import { useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import OrderedForm from '../../../../components/Form/OrderedForm';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import useOrdered from '../../../../hooks/ordered/useOrdered';
import CmsContainer from '../../../../layout/Container/CmsContainer';
import Page from '../../../../layout/Page';
import AdminAuthProvider from '../../../../layout/Provider/AdminAuthProvider';
import { UpdateOrderedRequest } from '../../../../models/api/cms';
import { updateOrderedById } from '../../../../services/cms';
import { isReqError } from '../../../../utils/common';
import { NextApplicationPage } from '../../../_app';

const CmsOrdered: NextApplicationPage = () => {
  const { ordered, isLoading } = useOrdered();
  const { t } = useTranslation();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateOrdered = async (values: UpdateOrderedRequest) => {
    if (!ordered) return;
    try {
      setIsUpdating(true);
      await updateOrderedById(ordered._id, values);
      toast({
        title: t('update_ordered_success'),
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
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AdminAuthProvider>
      <Page direction='row' w='full' title={t('ordered_details')}>
        <CmsContainer
          title={t('ordered_details')}
          href={APP_ROUTES.cms.ordered.list}
        >
          {!ordered || isLoading ? (
            <TableDetailSkeleton rows={7} />
          ) : (
            <OrderedForm
              isUpdating={isUpdating}
              ordered={ordered}
              handleUpdate={handleUpdateOrdered}
            />
          )}
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

CmsOrdered.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsOrdered;
