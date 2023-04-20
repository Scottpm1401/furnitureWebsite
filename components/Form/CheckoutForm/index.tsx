import { Button, Flex, Select, Stack, Text, useToast } from '@chakra-ui/react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { floor } from 'lodash';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';
import * as Yup from 'yup';

import { APP_ROUTES, FORM_BOX_SHADOW } from '../../../constant';
import { countries } from '../../../constant/country';
import { useResponsive } from '../../../hooks/responsive';
import { BillingDetailsType } from '../../../models/purchase';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { actions, selectors } from '../../../redux/reducer';
import { clearProductCart } from '../../../services/cart';
import { confirmPayment } from '../../../services/payment';
import CustomInput from '../../CustomInput';

const CheckoutForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const user = useAppSelector(selectors.user.selectUser);
  const cartTotal = useAppSelector(selectors.user.selectCartTotal);
  const userCart = useAppSelector(selectors.user.selectUserCart);
  const stripe = useStripe();
  const elements = useElements();
  const { isMobileOrTablet } = useResponsive();
  const toast = useToast();

  const checkoutSchema = Yup.object().shape({
    name: Yup.string().required(t('error.form.required')),
    email: Yup.string().email().required(t('error.form.required')),
    phone: Yup.string().required(t('error.form.required')),
    address: Yup.object().shape({
      country: Yup.string().required(t('error.form.required')),
      city: Yup.string().required(t('error.form.required')),
      state: Yup.string().required(t('error.form.required')),
      line1: Yup.string().required(t('error.form.required')),
    }),
  });

  const totalCartItem = useMemo(() => {
    let count = 0;
    userCart.forEach((item) => (count += item.quantity));
    return count;
  }, [userCart]);

  const initValue: BillingDetailsType = useMemo(() => {
    const name =
      user.info?.first_name && user.info?.last_name
        ? `${user.info?.first_name} ${user.info?.last_name}`
        : '';
    return {
      name,
      email: user.email,
      phone: user.info?.phone || '',
      address: {
        country: user.info?.address?.country || 'VN',
        city: user.info?.address?.city || '',
        state: user.info?.address?.state || '',
        line1: user.info?.address?.line1 || '',
        line2: user.info?.address?.line2,
      },
    };
  }, [user]);

  const handleCheckout = async (values: BillingDetailsType) => {
    if (!stripe || !elements) return;
    try {
      setIsLoading(true);
      setErrorMessage(undefined);

      const { error, paymentIntent } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        redirect: 'if_required',
      });
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
        const newOrdered = await confirmPayment({
          payment_method: paymentIntent.payment_method?.toString() || '',
          billing_details: values,
        });
        await clearProductCart();
        dispatch(actions.user.setUserCart([]));
        dispatch(actions.user.setUserCartTotal(0));
        router.push(APP_ROUTES.ordered);
      }
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
      bg='white'
      p='1.5rem 1rem'
      alignItems='center'
      justifyContent='center'
      boxShadow={FORM_BOX_SHADOW}
    >
      <Formik
        initialValues={initValue}
        onSubmit={handleCheckout}
        enableReinitialize
        validationSchema={checkoutSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack direction={isMobileOrTablet ? 'column' : 'row'} spacing={5}>
              <Flex direction='column' w='full'>
                <CustomInput
                  title={t('name')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.name,
                    onChange: handleChange('name'),
                  }}
                  error={
                    errors.name &&
                    touched.name && (
                      <Text fontSize='smaller' color='red'>
                        {errors.name}
                      </Text>
                    )
                  }
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('email')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.email,
                    onChange: handleChange('email'),
                  }}
                  error={
                    errors.email &&
                    touched.email && (
                      <Text fontSize='smaller' color='red'>
                        {errors.email}
                      </Text>
                    )
                  }
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('phone')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.phone,
                    onChange: handleChange('phone'),
                  }}
                  error={
                    errors.phone &&
                    touched.phone && (
                      <Text fontSize='smaller' color='red'>
                        {errors.phone}
                      </Text>
                    )
                  }
                />

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('country')}</Text>
                  <Select
                    mt='0.5rem'
                    value={values.address.country}
                    onChange={handleChange('address.country')}
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
                    value: values.address.city,
                    onChange: handleChange('address.city'),
                  }}
                  error={
                    errors.address?.city &&
                    touched.address?.city && (
                      <Text fontSize='smaller' color='red'>
                        {errors.address.city}
                      </Text>
                    )
                  }
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('state')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.address.state,
                    onChange: handleChange('address.state'),
                  }}
                  error={
                    errors.address?.state &&
                    touched.address?.state && (
                      <Text fontSize='smaller' color='red'>
                        {errors.address.state}
                      </Text>
                    )
                  }
                />

                <CustomInput
                  mt='1.5rem'
                  title={t('line1')}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.address.line1,
                    onChange: handleChange('address.line1'),
                  }}
                  error={
                    errors.address?.line1 &&
                    touched.address?.line1 && (
                      <Text fontSize='smaller' color='red'>
                        {errors.address.line1}
                      </Text>
                    )
                  }
                />

                <CustomInput
                  mt='1.5rem'
                  title={`${t('line2')} (${t('optional')})`}
                  inputProps={{
                    mt: '0.5rem',
                    value: values.address.line2,
                    onChange: handleChange('address.line2'),
                  }}
                />
              </Flex>
              <Stack
                w={isMobileOrTablet ? 'full' : '40%'}
                justifyContent='space-between'
                spacing={isMobileOrTablet ? 5 : 0}
              >
                <PaymentElement />

                <Stack spacing={3}>
                  <Text textAlign='center' fontWeight='semibold' fontSize='2xl'>
                    {t('summary')}
                  </Text>
                  <Flex mt='1rem !important' justifyContent='space-between'>
                    <Text fontWeight='semibold'>{t('subtotal')}:</Text>
                    <Text>${floor(cartTotal, 2)}</Text>
                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Text fontWeight='semibold'>{t('total_products')}:</Text>
                    <Text>{totalCartItem}</Text>
                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Text fontWeight='semibold'>{t('shipping_fee')}:</Text>
                    <Text>{t('free')}</Text>
                  </Flex>
                  <Flex w='full' h='1px' bg='gray.300' />
                  <Flex mt='1rem' justifyContent='space-between'>
                    <Text fontWeight='semibold'>{t('order_total')}:</Text>
                    <Text>${floor(cartTotal, 2)}</Text>
                  </Flex>
                  {errorMessage && (
                    <Text fontSize='smaller' color='red' textAlign='center'>
                      {errorMessage}
                    </Text>
                  )}
                  <Button
                    colorScheme='orange'
                    mt='1.5rem !important'
                    type='submit'
                    isLoading={isLoading}
                    loadingText={t('processing')}
                  >
                    {t('continue')}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default CheckoutForm;
