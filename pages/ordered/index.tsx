import {
  Button,
  Flex,
  Grid,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { floor } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { Rating } from 'react-simple-star-rating';

import Breadcrumb from '../../components/Breadcrumb';
import ColorButton from '../../components/ColorButton';
import Container from '../../components/Container';
import { APP_ROUTES, STAR_COLOR } from '../../constant';
import { useSelfOrdered } from '../../hooks/ordered';
import { useResponsive } from '../../hooks/responsive';
import AuthProvider from '../../layout/AuthProvider';
import Page from '../../layout/Page';
import { PurchaseProduct } from '../../models/purchase';
import StarIcon from '../../public/svg/star.svg';
import { ratingProduct } from '../../services/product';
import { formatAddress, formatDateTime } from '../../utils/common';

const Ordered = () => {
  const { t } = useTranslation();
  const { ordered: orders } = useSelfOrdered();
  const { isMobileOrTablet } = useResponsive();

  const handleRating = async (
    rate: number,
    purchase_id: string,
    product: PurchaseProduct
  ) => {
    try {
      await ratingProduct(product.product_id, {
        purchase_id,
        rate,
        color: product.color,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <AuthProvider>
      <Page
        title='Ordered'
        alignItems='center'
        justifyContent='center'
        direction='column'
      >
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            {
              title: t('your_ordered'),
              href: APP_ROUTES.ordered,
            },
          ]}
          current={t('your_ordered')}
        />

        <Stack w='full' spacing={0}>
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <Stack key={order._id} spacing={0}>
                <Stack bg='orange.100' paddingY='1rem'>
                  <Container>
                    <Grid
                      w='full'
                      templateColumns={isMobileOrTablet ? '1fr' : '1fr 1fr 1fr'}
                    >
                      <Stack spacing={2}>
                        <Text fontWeight='semibold'>{t('customer_info')}</Text>
                        <Stack spacing={1}>
                          <Text fontSize='sm'>{`${t('name')}: ${
                            order.billingDetails.name
                          }`}</Text>
                          <Text fontSize='sm'>{`${t('email')}: ${
                            order.billingDetails.email
                          }`}</Text>
                          <Text fontSize='sm'>{`${t('phone')}: ${
                            order.billingDetails.phone
                          }`}</Text>
                          <Text fontSize='sm'>{`${t(
                            'address'
                          )}: ${formatAddress(
                            order.billingDetails.address
                          )}`}</Text>
                        </Stack>
                      </Stack>
                      <Stack spacing={2}>
                        <Text fontWeight='semibold'>{t('payment_info')}</Text>
                        <Stack spacing={1}>
                          <Text fontSize='sm'>{`${t('payment_method')}: ${
                            order.payment_method
                          }`}</Text>

                          <Text fontSize='sm'>{`${t('total')}: $${floor(
                            order.total_bill,
                            2
                          )}`}</Text>
                        </Stack>
                      </Stack>
                      <Stack spacing={2}>
                        <Text fontWeight='semibold'>{t('package_info')}</Text>
                        <Stack spacing={1}>
                          <Text fontSize='sm'>{`${t('status')}: ${t(
                            order.status
                          )}`}</Text>
                          <Text fontSize='sm'>{`${t(
                            'package_date'
                          )}: ${formatDateTime(order.package_date)}`}</Text>
                          {order.arrive_date && (
                            <Text fontSize='sm'>{`${t(
                              'arrive_date'
                            )}: ${formatDateTime(order.arrive_date)}`}</Text>
                          )}
                        </Stack>
                      </Stack>
                    </Grid>
                  </Container>
                </Stack>
                <Stack bg='gray.100' paddingY='1rem'>
                  <Container>
                    {isMobileOrTablet ? (
                      <Stack spacing='2rem' mt='2.5rem' w='full'>
                        {order.products.map((item) => (
                          <Flex
                            position='relative'
                            direction='column'
                            key={item.product_id}
                          >
                            <Flex>
                              <Flex
                                w='200px'
                                h='160px'
                                mr='0.5rem'
                                position='relative'
                                overflow='hidden'
                                borderRadius='1rem'
                              >
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_CDN}${item.img}`}
                                  alt={item.title}
                                  fill
                                />
                              </Flex>
                              <Stack spacing='0.5rem' justifyContent='center'>
                                <Text fontWeight='semibold'>{item.title}</Text>
                                <Text fontWeight='semibold'>
                                  {t('price')}: ${item.price}
                                </Text>
                                <Flex alignItems='center'>
                                  <Text fontWeight='semibold' fontSize='small'>
                                    {t('color')}:
                                  </Text>
                                  <ColorButton
                                    product_color={item.color}
                                    active={false}
                                    cursor='default'
                                    ml='0.5rem'
                                    opacity={1}
                                  />
                                </Flex>
                                <Rating
                                  emptyIcon={
                                    <StarIcon
                                      style={{
                                        width: 24,
                                        height: 24,
                                        display: 'inline-block',
                                      }}
                                    />
                                  }
                                  fillIcon={
                                    <StarIcon
                                      style={{
                                        width: 24,
                                        height: 24,
                                        fill: STAR_COLOR,
                                        display: 'inline-block',
                                      }}
                                    />
                                  }
                                  initialValue={item.rating}
                                  onClick={(value) =>
                                    handleRating(value, order._id, item)
                                  }
                                  readonly={item.rating ? true : false}
                                />
                              </Stack>
                            </Flex>
                            <Flex
                              justifyContent='space-between'
                              alignItems='center'
                              mt='1rem'
                            >
                              <Text textAlign='center' fontWeight='semibold'>
                                {`${t('quantity')}: ${item.quantity}`}
                              </Text>

                              <Text fontWeight='semibold'>
                                {`${t('subtotal')}: $${floor(
                                  item.price * item.quantity,
                                  2
                                )}`}
                              </Text>
                            </Flex>
                          </Flex>
                        ))}
                      </Stack>
                    ) : (
                      <TableContainer w='full'>
                        <Table variant='simple'>
                          <Thead>
                            <Tr
                              sx={{
                                th: {
                                  fontSize: '1rem',
                                },
                              }}
                            >
                              <Th>{t('products')}</Th>
                              <Th>{t('price')}</Th>
                              <Th>{t('quantity')}</Th>
                              <Th>{t('subtotal')}</Th>
                              <Th>{t('rating')}</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {order.products.map((item) => (
                              <Tr key={item.product_id}>
                                <Td>
                                  <Flex>
                                    <Flex
                                      w='200px'
                                      h='160px'
                                      mr='0.5rem'
                                      position='relative'
                                      overflow='hidden'
                                      borderRadius='1rem'
                                    >
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_CDN}${item.img}`}
                                        alt={item.title}
                                        fill
                                      />
                                    </Flex>
                                    <Flex
                                      direction='column'
                                      justifyContent='center'
                                    >
                                      <Text fontWeight='semibold'>
                                        {item.title}
                                      </Text>
                                      <Flex alignItems='center' mt='0.5rem'>
                                        <Text
                                          fontWeight='semibold'
                                          fontSize='small'
                                        >
                                          {t('color')}:
                                        </Text>
                                        <ColorButton
                                          product_color={item.color}
                                          active={false}
                                          cursor='default'
                                          ml='0.5rem'
                                          opacity={1}
                                        />
                                      </Flex>
                                    </Flex>
                                  </Flex>
                                </Td>
                                <Td fontWeight='medium'>${item.price}</Td>
                                <Td fontWeight='medium'>{item.quantity}</Td>

                                <Td fontWeight='medium'>
                                  ${floor(item.price * item.quantity, 2)}
                                </Td>
                                <Td>
                                  <Rating
                                    emptyIcon={
                                      <StarIcon
                                        style={{
                                          width: 24,
                                          height: 24,
                                          display: 'inline-block',
                                        }}
                                      />
                                    }
                                    fillIcon={
                                      <StarIcon
                                        style={{
                                          width: 24,
                                          height: 24,
                                          fill: STAR_COLOR,
                                          display: 'inline-block',
                                        }}
                                      />
                                    }
                                    initialValue={item.rating}
                                    onClick={(value) =>
                                      handleRating(value, order._id, item)
                                    }
                                    readonly={item.rating ? true : false}
                                  />
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    )}
                  </Container>
                </Stack>
              </Stack>
            ))
          ) : (
            <Stack
              w='full'
              alignItems='center'
              justifyContent='center'
              spacing={4}
              minH='50vh'
            >
              <Text fontWeight='semibold' fontSize='2xl'>
                {t('empty_orders')}
              </Text>
              <Stack>
                <Link href={APP_ROUTES.products}>
                  <Button colorScheme='orange'>{t('continue_shopping')}</Button>
                </Link>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Page>
    </AuthProvider>
  );
};

export default Ordered;
