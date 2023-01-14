import { Flex, Skeleton, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Breadcrumb from '../../../components/Breadcrumb';
import Container from '../../../components/Container';
import CheckoutForm from '../../../components/Form/CheckoutForm';
import { usePayment } from '../../../hooks/usePayment';
import { useResponsive } from '../../../hooks/useResponsive';
import AuthProvider from '../../../layout/AuthProvider';
import Page from '../../../layout/Page';

type Props = {};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY || ''
);

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    fontSizeSm: '1rem',
    fontWeightNormal: '600',
  },
};

const Checkout = (props: Props) => {
  const { t } = useTranslation();
  const { isSmallDevice } = useResponsive();
  const { clientSecret, isLoading } = usePayment();

  return (
    <AuthProvider>
      <Page direction='column' title='Checkout'>
        <Breadcrumb
          links={[
            { title: t('home'), href: '/' },
            { title: t('cart'), href: '/cart' },
            { title: t('checkout'), href: '/cart/checkout' },
          ]}
          current={t('checkout')}
        />
        <Flex mt='5rem'>
          <Container direction='column'>
            <Flex mb='1rem' justifyContent='center'>
              <Text fontSize='3xl' fontWeight='semibold'>
                {t('checkout')}
              </Text>
            </Flex>
            {!isLoading ? (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance }}
              >
                <CheckoutForm />
              </Elements>
            ) : (
              <Flex
                w='full'
                borderRadius='0.5rem'
                bg='white'
                p='1.5rem 1rem'
                alignItems='center'
                justifyContent='center'
                boxShadow='rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
              >
                <Stack direction='row' spacing={5} w='full'>
                  <Stack spacing='1.5rem' w='full'>
                    {new Array(8).fill(0).map((item, index) => (
                      <Flex
                        direction='column'
                        w='full'
                        key={`${item}_${index}`}
                      >
                        <Flex>
                          <Skeleton>
                            <Text fontWeight='semibold'>Loading....</Text>
                          </Skeleton>
                        </Flex>
                        <Skeleton mt='0.5rem' w='full' h='24px' />
                      </Flex>
                    ))}
                  </Stack>
                  <Flex direction='column' w='40%'>
                    <Flex justifyContent='center'>
                      <Skeleton>
                        <Text fontSize='2xl'>Summary</Text>
                      </Skeleton>
                    </Flex>
                    <SkeletonText
                      mt='1.5rem'
                      spacing={4}
                      noOfLines={6}
                      skeletonHeight='4'
                    />
                  </Flex>
                </Stack>
              </Flex>
            )}
          </Container>
        </Flex>
      </Page>
    </AuthProvider>
  );
};

export default Checkout;
