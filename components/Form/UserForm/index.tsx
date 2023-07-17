import { Button, Select, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { countries } from '../../../constant/country';
import { UpdateUserRequest } from '../../../models/api/cms';
import { Gender, Role, UserType } from '../../../models/user';
import { useAppSelector } from '../../../redux/hooks';
import { selectors } from '../../../redux/reducer';
import { formatDateLong, getCountryName } from '../../../utils/common';
import CustomDatePicker from '../../CustomDatePicker';
import TableDetail from '../../Table/TableDetail';

type UserFormProps = {
  user: UserType;
  onSubmit: (values: UpdateUserRequest) => Promise<void>;
};

const UserForm = ({ user, onSubmit }: UserFormProps) => {
  const { t } = useTranslation();
  const [isUpdating, setIsUpdating] = useState(false);
  const isSuperAdmin = useAppSelector(selectors.user.isSuperAdmin);

  const handleSubmit = async (values: UpdateUserRequest) => {
    try {
      setIsUpdating(true);
      await onSubmit(values);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Formik
      initialValues={
        {
          displayName: user.displayName,
          username: user.username,
          birthday: user.birthday,
          role: user.role,
          info: user.info,
          password: undefined,
          email: user.email,
        } as UpdateUserRequest
      }
      onSubmit={handleSubmit}
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
                content: user._id,
              },
              {
                title: t('email'),
                content: values.email,
                edit: {
                  inputProps: {
                    onChange: handleChange('email'),
                  },
                  isInit: initialValues.email === values.email,
                },
              },
              {
                title: t('username'),
                content: values.username,
                edit: {
                  inputProps: {
                    onChange: handleChange('username'),
                  },
                  isInit: initialValues.username === values.username,
                },
              },
              {
                title: t('display_name'),
                content: values.displayName,
                edit: {
                  inputProps: {
                    onChange: handleChange('displayName'),
                  },
                  isInit: initialValues.displayName === values.displayName,
                },
              },
              {
                title: t('password'),
                content: values.password || '* * * * * * * * * * * *',
                edit: {
                  inputProps: {
                    onChange: handleChange('password'),
                    value: values.password,
                  },
                  isInit: false,
                },
              },
              {
                title: t('birthday'),
                content: formatDateLong(values.birthday),
                edit: {
                  customInput: (
                    <CustomDatePicker
                      w='full'
                      currentDate={moment(values.birthday).toDate()}
                      callback={(date) =>
                        setFieldValue('birthday', date?.toString())
                      }
                    />
                  ),
                  isInit: moment(initialValues.birthday).isSame(
                    values.birthday,
                    'day'
                  ),
                },
              },
              {
                title: t('role'),
                content: t(values.role || ''),
                edit: {
                  customInput: (
                    <Select value={values.role} onChange={handleChange('role')}>
                      <option value={Role.user}>{t(Role.user)}</option>
                      <option value={Role.shipper}>{t(Role.shipper)}</option>
                      <option value={Role.admin}>{t(Role.admin)}</option>
                      {isSuperAdmin && (
                        <option value={Role.super_admin}>
                          {t(Role.super_admin)}
                        </option>
                      )}
                    </Select>
                  ),
                  isInit: initialValues.role === values.role,
                },
              },

              //Info
              {
                title: t('phone'),
                content: values.info?.phone,
                edit: {
                  inputProps: {
                    onChange: handleChange('info.phone'),
                  },
                  isInit: initialValues.info?.phone === values.info?.phone,
                },
              },
              {
                title: t('first_name'),
                content: values.info?.first_name,
                edit: {
                  inputProps: {
                    onChange: handleChange('info.first_name'),
                  },
                  isInit:
                    initialValues.info?.first_name === values.info?.first_name,
                },
              },
              {
                title: t('last_name'),
                content: values.info?.last_name,
                edit: {
                  inputProps: {
                    onChange: handleChange('info.last_name'),
                  },
                  isInit:
                    initialValues.info?.last_name === values.info?.last_name,
                },
              },
              {
                title: t('gender'),
                content: t(values.info?.sex || ''),
                edit: {
                  customInput: (
                    <Select
                      value={values.info?.sex}
                      onChange={handleChange('info.sex')}
                    >
                      {Object.values(Gender).map((gen) => (
                        <option value={gen} key={gen}>
                          {t(gen)}
                        </option>
                      ))}
                    </Select>
                  ),
                  isInit: initialValues.info?.sex === values.info?.sex,
                },
              },

              //Address
              {
                title: t('country'),
                content: getCountryName(values.info?.address?.country),
                edit: {
                  customInput: (
                    <Select
                      value={values.info?.address?.country}
                      onChange={handleChange('info.address.country')}
                    >
                      {countries.map((country) => (
                        <option value={country.code} key={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </Select>
                  ),
                  isInit:
                    initialValues.info?.address?.country ===
                    values.info?.address?.country,
                },
              },
              {
                title: t('city'),
                content: values.info?.address?.city,
                edit: {
                  inputProps: {
                    onChange: handleChange('info.address.city'),
                  },
                  isInit:
                    initialValues.info?.address?.city ===
                    values.info?.address?.city,
                },
              },
              {
                title: t('state'),
                content: values.info?.address?.state,
                edit: {
                  inputProps: {
                    onChange: handleChange('info.address.state'),
                  },
                  isInit:
                    initialValues.info?.address?.state ===
                    values.info?.address?.state,
                },
              },
              {
                title: t('line1'),
                content: values.info?.address?.line1,
                edit: {
                  inputProps: {
                    onChange: handleChange('info.address.line1'),
                  },
                  isInit:
                    initialValues.info?.address?.line1 ===
                    values.info?.address?.line1,
                },
              },
              {
                title: t('line2'),
                content: values.info?.address?.line2,
                edit: {
                  inputProps: {
                    onChange: handleChange('info.address.line2'),
                  },
                  isInit:
                    initialValues.info?.address?.line2 ===
                    values.info?.address?.line2,
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
              {t('update_profile')}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
