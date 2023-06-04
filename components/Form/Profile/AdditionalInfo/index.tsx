import { Button, Flex, Input, Select, Text, useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { countries } from '../../../../constant/country';
import { useResponsive } from '../../../../hooks/responsive';
import { Gender, UserInfoType } from '../../../../models/user';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actions, selectors } from '../../../../redux/reducer';
import { updateUser } from '../../../../services/user';
import CustomDatePicker from '../../../CustomDatePicker';
import CustomInput from '../../../CustomInput';

type AdditionalInfoType = {
  birthday: string;
  info?: UserInfoType;
};

const AdditionalInfoProfile = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectors.user.selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isMobile } = useResponsive();

  const handleUpdateProfile = async (values: AdditionalInfoType) => {
    try {
      setIsLoading(true);
      const updatedUser = await updateUser({
        username: user.username,
        ...values,
      });
      dispatch(actions.user.setUser(updatedUser));
      toast({
        title: t('update_profile_success'),
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      w='full'
      borderRadius='0.5rem'
      alignItems='center'
      justifyContent='center'
      direction='column'
    >
      <Flex direction='column' w='full'>
        <Text fontSize='xl' fontWeight='bold'>
          {t('additional_info')}
        </Text>
        <Flex mt='1rem' w='full' h='1px' bg='blackAlpha.400' />
      </Flex>
      <Formik
        initialValues={
          {
            birthday: user.birthday,
            info: {
              ...user.info,
              address: {
                ...user.info?.address,
                country: user.info?.address?.country || 'VN',
              },
            },
          } as AdditionalInfoType
        }
        onSubmit={handleUpdateProfile}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <Form
            style={{ width: '100%', marginTop: '1rem' }}
            onSubmit={handleSubmit}
          >
            <Flex w='full'>
              <Flex w='full' direction='column'>
                <CustomInput
                  mt='1.5rem'
                  title={t('first_name')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.info?.first_name,
                    onChange: handleChange('info.first_name'),
                  }}
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('last_name')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.info?.last_name,
                    onChange: handleChange('info.last_name'),
                  }}
                />

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('birthday')}</Text>
                  <CustomDatePicker
                    mt='0.5rem'
                    currentDate={moment(values.birthday).toDate()}
                    callback={(date) =>
                      setFieldValue('birthday', date?.toString())
                    }
                  />
                </Flex>

                <CustomInput
                  mt='1.5rem'
                  title={t('phone')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.info?.phone,
                    onChange: handleChange('info.phone'),
                  }}
                />

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('gender')}</Text>
                  <Select
                    mt='0.5rem'
                    value={values.info?.sex}
                    onChange={handleChange('info.sex')}
                  >
                    {Object.values(Gender).map((gen) => (
                      <option value={gen} key={gen}>
                        {t(gen)}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('country')}</Text>
                  <Select
                    mt='0.5rem'
                    value={values.info?.address?.country}
                    onChange={handleChange('info.address.country')}
                  >
                    {countries.map((country) => (
                      <option value={country.code} key={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <CustomInput
                  mt='1.5rem'
                  title={t('city')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.info?.address?.city,
                    onChange: handleChange('info.address.city'),
                  }}
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('state')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.info?.address?.state,
                    onChange: handleChange('info.address.state'),
                  }}
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('line1')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.info?.address?.line1,
                    onChange: handleChange('info.address.line1'),
                  }}
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('line2')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.info?.address?.line2,
                    onChange: handleChange('info.address.line2'),
                  }}
                />

                <Flex mt='2rem'>
                  <Button
                    isLoading={isLoading}
                    loadingText={t('updating')}
                    type='submit'
                    colorScheme='orange'
                  >
                    {t('update_profile')}
                  </Button>
                </Flex>
              </Flex>
              <Flex
                ml='4rem'
                mt='0.5rem'
                w='160px'
                h='160px'
                direction='column'
                display={isMobile ? 'none' : 'flex'}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default AdditionalInfoProfile;
