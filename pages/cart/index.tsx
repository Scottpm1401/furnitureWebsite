import {
  Button,
  Flex,
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
import { debounce, floor } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo } from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import ColorButton from '../../components/ColorButton';
import Container from '../../components/Container';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/useResponsive';
import AuthProvider from '../../layout/AuthProvider';
import Page from '../../layout/Page';
import { ProductCartType } from '../../models/cart';
import MinusIcon from '../../public/svg/minus.svg';
import PlusIcon from '../../public/svg/plus.svg';
import TrashIcon from '../../public/svg/trash.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions, selectors } from '../../redux/reducer';
import {
  clearProductCart,
  removeProductCart,
  updateCartQuantity,
} from '../../services/cart';

type Props = {};

const Cart = (props: Props) => {
  const { t } = useTranslation();
  const userCart = useAppSelector(selectors.user.selectUserCart);
  const cartTotal = useAppSelector(selectors.user.selectCartTotal);
  const dispatch = useAppDispatch();
  const { isMobileOrTablet } = useResponsive();
  const totalCartItem = useMemo(() => {
    let count = 0;
    userCart.forEach((item) => (count += item.quantity));
    return count;
  }, [userCart]);

  const handleQuantity = debounce(
    async (product: ProductCartType, isMinus: boolean) => {
      if (isMinus && product.quantity === 1) return;
      try {
        const newCart = await updateCartQuantity({
          product_id: product.product_id,
          color: product.color,
          quantity: isMinus ? -1 : 1,
        });
        dispatch(actions.user.setUserCart(newCart));
        dispatch(
          actions.user.setUserCartTotal(
            isMinus ? -product.price : product.price
          )
        );
      } catch (error) {}
    },
    300
  );

  const handleRemoveProduct = async (product: ProductCartType) => {
    try {
      const newCart = await removeProductCart({
        product_id: product.product_id,
        color: product.color,
      });
      dispatch(actions.user.setUserCart(newCart));
      dispatch(
        actions.user.setUserCartTotal(-(product.price * product.quantity))
      );
    } catch (error) {}
  };

  const handleClearCart = async () => {
    try {
      await clearProductCart();
      dispatch(actions.user.setUserCart([]));
      dispatch(actions.user.setUserCartTotal(0));
    } catch (error) {}
  };

  return (
    <AuthProvider>
      <Page direction='column' title='Cart'>
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            { title: t('cart'), href: APP_ROUTES.cart },
          ]}
          current={t('cart')}
        />
        {userCart.length > 0 ? (
          <Container direction='column'>
            {isMobileOrTablet ? (
              <Stack spacing='2rem' mt='2.5rem'>
                {userCart.map((item) => (
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
                      <Flex alignItems='center'>
                        <Button
                          variant='unstyled'
                          onClick={() => handleQuantity(item, true)}
                          w='24px'
                          h='24px'
                        >
                          <MinusIcon />
                        </Button>
                        <Text
                          marginX='0.25rem'
                          textAlign='center'
                          w='24px'
                          fontWeight='medium'
                        >
                          {item.quantity}
                        </Text>
                        <Button
                          variant='unstyled'
                          onClick={() => handleQuantity(item, false)}
                          w='24px'
                          h='24px'
                        >
                          <PlusIcon />
                        </Button>
                      </Flex>
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
                    {userCart.map((item) => (
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
                            </Flex>
                          </Flex>
                        </Td>
                        <Td fontWeight='medium'>${item.price}</Td>
                        <Td>
                          <Flex alignItems='center'>
                            <Button
                              variant='unstyled'
                              onClick={() => handleQuantity(item, true)}
                              w='24px'
                              h='24px'
                            >
                              <MinusIcon />
                            </Button>
                            <Text
                              marginX='0.5rem'
                              textAlign='center'
                              w='40px'
                              fontWeight='medium'
                            >
                              {item.quantity}
                            </Text>
                            <Button
                              variant='unstyled'
                              onClick={() => handleQuantity(item, false)}
                              w='24px'
                              h='24px'
                            >
                              <PlusIcon />
                            </Button>
                          </Flex>
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
                <Link style={{ marginTop: '1rem' }} href={APP_ROUTES.checkout}>
                  <Button colorScheme='orange' w='full'>
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
            <Text fontSize='3xl' fontWeight='semibold'>
              {t('empty_cart')}
            </Text>
            <Link href={APP_ROUTES.products}>
              <Button mt='1rem' colorScheme='orange' size='lg'>
                {t('fill_in')}
              </Button>
            </Link>
          </Flex>
        )}
      </Page>
    </AuthProvider>
  );
};

export default Cart;
