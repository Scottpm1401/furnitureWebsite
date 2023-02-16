import { Button, Flex, Input, Select, Stack, Text } from '@chakra-ui/react';
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
import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';

import { countries } from '../../../constant/country';
import { BillingDetailsType } from '../../../models/purchase';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { actions, selectors } from '../../../redux/reducer';
import { clearProductCart } from '../../../services/cart';
import { confirmPayment } from '../../../services/payment';

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
        dispatch(actions.user.setUserOrdered(newOrdered));
        router.push('/ordered');
      }
    } catch (err) {
      console.log(err);
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
      boxShadow='rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
    >
      <Formik
        initialValues={initValue}
        onSubmit={handleCheckout}
        enableReinitialize
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack direction='row' spacing={5}>
              <Flex direction='column' w='full'>
                <Flex direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('name')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.name}
                    onChange={handleChange('name')}
                  />
                  {errors.name && touched.name && (
                    <Text fontSize='smaller' color='red'>
                      {errors.name}
                    </Text>
                  )}
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('email')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.email}
                    onChange={handleChange('email')}
                  />
                  {errors.email && touched.email && (
                    <Text fontSize='smaller' color='red'>
                      {errors.email}
                    </Text>
                  )}
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('phone')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.phone}
                    onChange={handleChange('phone')}
                  />
                  {errors.phone && touched.phone && (
                    <Text fontSize='smaller' color='red'>
                      {errors.phone}
                    </Text>
                  )}
                </Flex>

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

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('city')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.address.city}
                    onChange={handleChange('address.city')}
                  />
                  {errors.address?.city && touched.address?.city && (
                    <Text fontSize='smaller' color='red'>
                      {errors.address?.city}
                    </Text>
                  )}
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('state')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.address.state}
                    onChange={handleChange('address.state')}
                  />
                  {errors.address?.state && touched.address?.state && (
                    <Text fontSize='smaller' color='red'>
                      {errors.address?.state}
                    </Text>
                  )}
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('line1')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.address.line1}
                    onChange={handleChange('address.line1')}
                  />
                  {errors.address?.line1 && touched.address?.line1 && (
                    <Text fontSize='smaller' color='red'>
                      {errors.address?.line1}
                    </Text>
                  )}
                </Flex>

                <Flex mt='1.5rem' direction='column' w='full'>
                  <Text fontWeight='semibold'>{t('line2')}</Text>
                  <Input
                    mt='0.5rem'
                    value={values.address.line2}
                    onChange={handleChange('address.line2')}
                    placeholder='Optional'
                  />
                </Flex>
              </Flex>
              <Flex direction='column' w='40%' justifyContent='space-between'>
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
              </Flex>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default CheckoutForm;
