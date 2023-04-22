import { Button, Select, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { countries } from '../../../constant/country';
import { UpdateOrderedRequest } from '../../../models/api/cms';
import { PurchaseStatus, PurchaseType } from '../../../models/purchase';
import { formatDateTimeLong, getCountryName } from '../../../utils/common';
import CustomDatePicker from '../../CustomDatePicker';
import TableDetail from '../../Table/TableDetail';

type OrderedFormProps = {
  ordered: PurchaseType;
  isUpdating?: boolean;
  handleUpdate: (values: UpdateOrderedRequest) => Promise<void>;
};

const OrderedForm = ({
  ordered,
  isUpdating,
  handleUpdate,
}: OrderedFormProps) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={
        {
          status: ordered.status,
          arrive_date: ordered.arrive_date,
          package_date: ordered.package_date,
          total_bill: ordered.total_bill,
          billingDetails: ordered.billingDetails,
        } as UpdateOrderedRequest
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
                content: ordered._id,
              },
              {
                title: t('name'),
                content: ordered.billingDetails.name,
              },
              {
                title: t('email'),
                content: ordered.billingDetails.email,
              },
              {
                title: t('phone'),
                content: ordered.billingDetails.phone,
              },
              {
                title: t('payment_method'),
                content: ordered.payment_method,
              },
              {
                title: t('status'),
                content: values.status && t(values.status),
                edit: {
                  customInput: (
                    <Select
                      value={values.status}
                      onChange={handleChange('status')}
                    >
                      <option value={PurchaseStatus.package}>
                        {t(PurchaseStatus.package)}
                      </option>
                      <option value={PurchaseStatus.shipping}>
                        {t(PurchaseStatus.shipping)}
                      </option>
                      <option value={PurchaseStatus.delivered}>
                        {t(PurchaseStatus.delivered)}
                      </option>
                    </Select>
                  ),
                  isInit: initialValues.status === values.status,
                },
              },
              {
                title: t('package_date'),
                content: formatDateTimeLong(values.package_date),
                edit: {
                  customInput: (
                    <CustomDatePicker
                      w='full'
                      currentDate={moment(values.package_date).toDate()}
                      callback={(date) =>
                        setFieldValue('package_date', date?.toString())
                      }
                      format='dd/MM/yyyy h:mm aa'
                      showTimeSelect
                    />
                  ),
                  isInit: moment(initialValues.package_date).isSame(
                    values.package_date,
                    'day'
                  ),
                },
              },
              {
                title: t('arrive_date'),
                content:
                  values.arrive_date && formatDateTimeLong(values.arrive_date),
                edit: {
                  customInput: (
                    <CustomDatePicker
                      w='full'
                      currentDate={moment(values.arrive_date).toDate()}
                      callback={(date) =>
                        setFieldValue('arrive_date', date?.toString())
                      }
                      format='dd/MM/yyyy h:mm aa'
                      showTimeSelect
                    />
                  ),

                  isInit: moment(initialValues.arrive_date).isSame(
                    values.arrive_date,
                    'day'
                  ),
                },
              },
              {
                title: t('total'),
                content: `$${values.total_bill}`,
                edit: {
                  inputProps: {
                    onChange: handleChange('total_bill'),
                    value: values.total_bill,
                  },
                  isInit: initialValues.total_bill === values.total_bill,
                },
              },

              {
                title: t('country'),
                content: getCountryName(values.billingDetails?.address.country),
                edit: {
                  customInput: (
                    <Select
                      value={values.billingDetails?.address?.country}
                      onChange={handleChange('billingDetails.address.country')}
                    >
                      {countries.map((country) => (
                        <option value={country.code} key={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </Select>
                  ),
                  isInit:
                    initialValues.billingDetails?.address?.country ===
                    values.billingDetails?.address?.country,
                },
              },
              {
                title: t('city'),
                content: values.billingDetails?.address.city,
                edit: {
                  inputProps: {
                    onChange: handleChange('billingDetails.address.city'),
                  },
                  isInit:
                    initialValues.billingDetails?.address?.city ===
                    values.billingDetails?.address?.city,
                },
              },
              {
                title: t('state'),
                content: values.billingDetails?.address.state,
                edit: {
                  inputProps: {
                    onChange: handleChange('billingDetails.address.state'),
                  },
                  isInit:
                    initialValues.billingDetails?.address?.state ===
                    values.billingDetails?.address?.state,
                },
              },
              {
                title: t('line1'),
                content: values.billingDetails?.address.line1,
                edit: {
                  inputProps: {
                    onChange: handleChange('billingDetails.address.line1'),
                  },
                  isInit:
                    initialValues.billingDetails?.address?.line1 ===
                    values.billingDetails?.address?.line1,
                },
              },
              {
                title: t('line2'),
                content: values.billingDetails?.address.line2,
                edit: {
                  inputProps: {
                    onChange: handleChange('billingDetails.address.line2'),
                  },
                  isInit:
                    initialValues.billingDetails?.address?.line2 ===
                    values.billingDetails?.address?.line2,
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
              {t('update_ordered')}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default OrderedForm;
