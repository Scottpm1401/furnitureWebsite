import {
  Button,
  Flex,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import Breadcrumb from '../../../components/Breadcrumb';
import Container from '../../../components/Container';
import CheckoutForm from '../../../components/Form/CheckoutForm';
import { APP_ROUTES } from '../../../constant';
import { usePayment } from '../../../hooks/usePayment';
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

  const { clientSecret, isLoading } = usePayment();

  return (
    <AuthProvider>
      <Page direction='column' title='Checkout'>
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            { title: t('cart'), href: APP_ROUTES.cart },
            { title: t('checkout'), href: APP_ROUTES.checkout },
          ]}
          current={t('checkout')}
        />
        <Flex mt='5rem'>
          <Container direction='column' minH='60vh' justifyContent='center'>
            <Flex mb='1rem' justifyContent='center'>
              <Text fontSize='3xl' fontWeight='semibold'>
                {t('checkout')}
              </Text>
            </Flex>
            {!isLoading ? (
              clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret, appearance }}
                >
                  <CheckoutForm />
                </Elements>
              ) : (
                <Stack w='full' mt='0.5rem' spacing={4} alignItems='center'>
                  <Text fontSize='xl'>{t('empty_checkout')}</Text>
                  <Link href={APP_ROUTES.products}>
                    <Button colorScheme='orange'>
                      <Text>{t('fill_in')}</Text>
                    </Button>
                  </Link>
                </Stack>
              )
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