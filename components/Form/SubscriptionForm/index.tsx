import { Button, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';

import { UpdateSubscriptionRequest } from '../../../models/api/cms';
import { SubscriptionType } from '../../../models/subscription';
import TableDetail from '../../Table/TableDetail';

type SubscriptionFormProps = {
  subscription: SubscriptionType;
  isUpdating?: boolean;
  handleUpdate: (values: UpdateSubscriptionRequest) => Promise<void>;
};

const SubscriptionForm = ({
  subscription,
  isUpdating,
  handleUpdate,
}: SubscriptionFormProps) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={
        {
          name: subscription.name,
          phone: subscription.phone,
          address: subscription.address,
        } as UpdateSubscriptionRequest
      }
      onSubmit={handleUpdate}
      enableReinitialize
    >
      {({
        values,
        initialValues,
        handleChange,
        setFieldValue,
        handleSubmit,
        handleReset,
      }) => (
        <Form onSubmit={handleSubmit}>
          <TableDetail
            rows={[
              {
                title: 'ID',
                content: subscription._id,
              },
              {
                title: t('email'),
                content: subscription.email,
              },
              {
                title: t('name_of_user'),
                content: values.name,
                edit: {
                  inputProps: {
                    onChange: handleChange('name'),
                    value: values.name,
                  },
                  isInit: initialValues.name === values.name,
                },
              },
              {
                title: t('phone'),
                content: values.phone,
                edit: {
                  inputProps: {
                    onChange: handleChange('phone'),
                    value: values.phone,
                  },
                  isInit: initialValues.phone === values.phone,
                },
              },
              {
                title: t('address'),
                content: values.address,
                edit: {
                  inputProps: {
                    onChange: handleChange('address'),
                    value: values.address,
                  },
                  isInit: initialValues.address === values.address,
                },
              },
            ]}
          />
          <Stack
            direction='row'
            mt='2rem'
            alignItems='center'
            justifyContent='center'
            spacing={8}
          >
            <Button
              colorScheme='orange'
              variant='outline'
              onClick={handleReset}
            >
              {t('reset')}
            </Button>
            <Button
              isLoading={isUpdating}
              loadingText={t('updating')}
              type='submit'
              colorScheme='orange'
            >
              {t('update_subscription')}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SubscriptionForm;
