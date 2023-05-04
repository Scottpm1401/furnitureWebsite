import { Stack, useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import SubscriptionForm from '../../../../components/Form/SubscriptionForm';
import TableDetailSkeleton from '../../../../components/Table/TableDetailSkeleton';
import { APP_ROUTES } from '../../../../constant';
import { useSubscription } from '../../../../hooks/subscription';
import CmsContainer from '../../../../layout/Container/CmsContainer';
import Page from '../../../../layout/Page';
import AdminAuthProvider from '../../../../layout/Provider/AdminAuthProvider';
import { UpdateSubscriptionRequest } from '../../../../models/api/cms';
import { updateSubscriptionById } from '../../../../services/cms';
import { isReqError } from '../../../../utils/common';
import { NextApplicationPage } from '../../../_app';

const CmsSubscription: NextApplicationPage = () => {
  const { subscription, isLoading } = useSubscription();
  const { t } = useTranslation();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateSubscription = async (
    values: UpdateSubscriptionRequest
  ) => {
    if (!subscription) return;
    try {
      setIsUpdating(true);
      await updateSubscriptionById(subscription._id, values);
      toast({
        title: t('update_subscription_success'),
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
      <Page direction='row' w='full' title={t('subscription_details')}>
        <CmsContainer
          title={t('subscription_details')}
          href={APP_ROUTES.cms.subscriptions.list}
        >
          {!subscription || isLoading ? (
            <TableDetailSkeleton rows={7} />
          ) : (
            <SubscriptionForm
              isUpdating={isUpdating}
              subscription={subscription}
              handleUpdate={handleUpdateSubscription}
            />
          )}
        </CmsContainer>
      </Page>
    </AdminAuthProvider>
  );
};

CmsSubscription.getLayout = (page: React.ReactElement) => {
  return <AdminAuthProvider>{page}</AdminAuthProvider>;
};

export default CmsSubscription;
