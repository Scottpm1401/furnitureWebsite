import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { floor } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo } from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import ColorButton from '../../components/ColorButton';
import Counter from '../../components/Counter';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import { useCart } from '../../hooks/user';
import Container from '../../layout/Container';
import Page from '../../layout/Page';
import AuthProvider from '../../layout/Provider/AuthProvider';
import { ProductCartType } from '../../models/cart';
import TrashIcon from '../../public/svg/trash.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions, selectors } from '../../redux/reducer';
import {
  clearProductCart,
  removeProductCart,
  updateCartQuantity,
} from '../../services/cart';
import { NextApplicationPage } from '../_app';

const CartSkeleton = () => {
  return (
    <Stack
      direction='row'
      w='full'
      justifyContent='space-between'
      alignItems='center'
    >
      <Stack direction='row'>
        <Skeleton w='200px' h='160px' />
        <Stack spacing={2} justifyContent='center'>
          <Skeleton w='160px' h='20px' />
          <Skeleton w='80px' h='20px' />
        </Stack>
      </Stack>
      <Skeleton w='70px' h='20px' />
      <Skeleton w='175px' h='24px' />
      <Skeleton w='70px' h='20px' />
      <Skeleton w='24px' h='24px' />
    </Stack>
  );
};

const Cart: NextApplicationPage = () => {
  const { t } = useTranslation();
  const { cart, checkCart, isLoading } = useCart();
  const cartTotal = useAppSelector(selectors.user.selectCartTotal);
  const dispatch = useAppDispatch();
  const { isMobileOrTablet } = useResponsive();
  const toast = useToast();

  const totalCartItem = useMemo(() => {
    let count = 0;
    cart.forEach((item) => (count += item.quantity));
    return count;
  }, [cart]);

  useEffect(() => {
    checkCart();
  }, [checkCart]);

  const isHasOutOfStockItem = useMemo(
    () => cart.every((item) => item.isAvailable === true),
    [cart]
  );

  const handleQuantity = async (product: ProductCartType, quantity: number) => {
    try {
      const data = await updateCartQuantity({
        product_id: product.product_id,
        color: product.color,
        quantity: quantity,
      });
      dispatch(actions.user.setUserCart(data.cart));
      dispatch(actions.user.setUserCartTotal(data.cart_total));
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  };

  const handleRemoveProduct = async (product: ProductCartType) => {
    try {
      const newCart = await removeProductCart({
        product_id: product.product_id,
        color: product.color,
      });
      dispatch(actions.user.setUserCart(newCart));
      dispatch(
        actions.user.setUserCartTotal(
          cartTotal - product.price * product.quantity
        )
      );
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  };

  const handleClearCart = async () => {
    try {
      await clearProductCart();
      dispatch(actions.user.setUserCart([]));
      dispatch(actions.user.setUserCartTotal(-cartTotal));
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  };

  return (
    <Page direction='column' title={t('cart')}>
      <Breadcrumb
        links={[
          { title: t('home'), href: APP_ROUTES.home },
          { title: t('cart'), href: APP_ROUTES.cart },
        ]}
        current={t('cart')}
      />
      {!isLoading ? (
        cart.length > 0 ? (
          <Container direction='column'>
            {isMobileOrTablet ? (
              <Stack spacing='2rem' mt='2.5rem'>
                {cart.map((item) => (
                  <Flex
                    position='relative'
                    direction='column'
                    key={item.product_id}
                    opacity={item.isAvailable ? 1 : 0.7}
                  >
                    <Flex>
                      <Flex
                        w='200px'
                        h='200px'
                        mr='0.5rem'
                        position='relative'
                        overflow='hidden'
                        borderRadius='1rem'
                      >
                        <Image
                          style={{ objectFit: 'cover' }}
                          src={`${process.env.NEXT_PUBLIC_CDN}${item.img}`}
                          alt={item.title}
                          fill
                          sizes='33vw'
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
                        {!item.isAvailable && (
                          <Text color='red.600' fontWeight='semibold'>
                            {t('out_of_stock')}
                          </Text>
                        )}
                      </Stack>
                    </Flex>
                    <Flex
                      justifyContent='space-between'
                      alignItems='center'
                      mt='1rem'
                    >
                      <Text fontWeight='semibold' mt='0.5rem'>
                        {t('subtotal')}: ${floor(item.price * item.quantity, 2)}
                      </Text>
                      <Counter
                        quantity={item.quantity}
                        onUpdate={(quantity) => handleQuantity(item, quantity)}
                      />
                    </Flex>

                    <Flex
                      position='absolute'
                      top='0'
                      right='0'
                      bg='orange.400'
                      p='4px'
                      cursor='pointer'
                      w='24px'
                      h='24px'
                      borderRadius='4px'
                      _hover={{ opacity: 0.8 }}
                      transition='all 300ms ease-in-out'
                      onClick={() => handleRemoveProduct(item)}
                    >
                      <TrashIcon style={{ stroke: 'white' }} />
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            ) : (
              <TableContainer mt='2.5rem' w='full'>
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
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cart.map((item) => (
                      <Tr
                        key={item.product_id}
                        opacity={item.isAvailable ? 1 : 0.6}
                      >
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
                                style={{ objectFit: 'cover' }}
                                src={`${process.env.NEXT_PUBLIC_CDN}${item.img}`}
                                alt={item.title}
                                fill
                                sizes='33vw'
                              />
                            </Flex>
                            <Flex direction='column' justifyContent='center'>
                              <Text fontWeight='semibold'>{item.title}</Text>
                              <Flex alignItems='center' mt='0.5rem'>
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
                              {!item.isAvailable && (
                                <Text color='red.600' fontWeight='semibold'>
                                  {t('out_of_stock')}
                                </Text>
                              )}
                            </Flex>
                          </Flex>
                        </Td>
                        <Td fontWeight='medium'>${item.price}</Td>
                        <Td>
                          <Counter
                            quantity={item.quantity}
                            onUpdate={(quantity) =>
                              handleQuantity(item, quantity)
                            }
                          />
                        </Td>

                        <Td fontWeight='medium'>
                          ${floor(item.price * item.quantity, 2)}
                        </Td>
                        <Td>
                          <Flex
                            bg='orange.400'
                            p='4px'
                            cursor='pointer'
                            w='24px'
                            h='24px'
                            borderRadius='4px'
                            _hover={{ opacity: 0.8 }}
                            transition='all 300ms ease-in-out'
                            onClick={() => handleRemoveProduct(item)}
                          >
                            <TrashIcon style={{ stroke: 'white' }} />
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}

            <Flex w='full' justifyContent='space-between' mt='1rem'>
              <Link href={APP_ROUTES.products}>
                <Button colorScheme='orange' size='sm'>
                  {t('continue_shopping')}
                </Button>
              </Link>

              <Button
                size='sm'
                colorScheme='blackAlpha'
                onClick={() => handleClearCart()}
              >
                {t('clear_cart')}
              </Button>
            </Flex>
            <Flex mt='2.5rem' justifyContent='flex-end'>
              <Flex
                direction='column'
                p='1.5rem'
                w='400px'
                borderRadius='16px'
                border='3px solid var(--chakra-colors-orange-400)'
              >
                <Text fontSize='2xl' fontWeight='semibold' textAlign='center'>
                  {t('order')}
                </Text>
                <Flex mt='1rem' justifyContent='space-between'>
                  <Text fontSize='xl' fontWeight='semibold'>
                    {t('subtotal')}:
                  </Text>
                  <Text fontSize='xl' fontWeight='semibold'>
                    ${floor(cartTotal, 2)}
                  </Text>
                </Flex>
                <Flex mt='0.5rem' justifyContent='space-between'>
                  <Text fontSize='xl' fontWeight='semibold'>
                    {t('total_products')}:
                  </Text>
                  <Text fontSize='xl' fontWeight='semibold'>
                    {totalCartItem}
                  </Text>
                </Flex>
                <Flex mt='0.5rem' justifyContent='space-between'>
                  <Text fontSize='xl' fontWeight='semibold'>
                    {t('shipping_fee')}:
                  </Text>
                  <Text fontSize='xl' fontWeight='semibold'>
                    {t('free')}
                  </Text>
                </Flex>
                <Flex mt='0.5rem' w='full' h='1px' bg='gray.300' />
                <Flex mt='1rem' justifyContent='space-between'>
                  <Text fontSize='xl' fontWeight='semibold'>
                    {t('order_total')}:
                  </Text>
                  <Text fontSize='xl' fontWeight='semibold'>
                    ${floor(cartTotal, 2)}
                  </Text>
                </Flex>
                {!isHasOutOfStockItem && (
                  <Flex mt='1rem' fontWeight='semibold'>
                    <Text color='red.600'>{t('remove_out_of_stock')}</Text>
                  </Flex>
                )}

                <Link style={{ marginTop: '1rem' }} href={APP_ROUTES.checkout}>
                  <Button
                    colorScheme='orange'
                    w='full'
                    disabled={!isHasOutOfStockItem}
                  >
                    {t('checkout')}
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Container>
        ) : (
          <Flex
            minH='500px'
            direction='column'
            w='full'
            justifyContent='center'
            alignItems='center'
          >
            <Text fontSize='3xl' fontWeight='semibold' textAlign='center'>
              {t('empty_cart')}
            </Text>
            <Link href={APP_ROUTES.products}>
              <Button mt='1rem' colorScheme='orange' size='lg'>
                {t('fill_in')}
              </Button>
            </Link>
          </Flex>
        )
      ) : (
        <Container w='full'>
          <Stack w='full' mt='2.5rem' spacing={4}>
            {new Array(5).fill(0).map((item, index) => (
              <CartSkeleton key={`${item}_${index}`} />
            ))}
          </Stack>
        </Container>
      )}
    </Page>
  );
};

Cart.getLayout = (page: React.ReactElement) => {
  return <AuthProvider>{page}</AuthProvider>;
};

export default Cart;
