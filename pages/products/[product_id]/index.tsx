import {
  Button,
  Flex,
  FlexProps,
  Grid,
  Skeleton,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

import Breadcrumb from '../../../components/Breadcrumb';
import ColorButton from '../../../components/ColorButton';
import Container from '../../../components/Container';
import Page from '../../../layout/Page';
import { ProductCartType } from '../../../models/cart';
import { ProductType } from '../../../models/product';
import MinusIcon from '../../../public/svg/minus.svg';
import PlusIcon from '../../../public/svg/plus.svg';
import StarIcon from '../../../public/svg/star.svg';
import { getProductById } from '../../../services/product';

type Props = {} & FlexProps;

const initProductCart: ProductCartType = {
  product_id: '',
  img: '',
  title: '',
  price: 0,
  quantity: 1,
  color: '',
};

const Product = ({ ...props }: Props) => {
  const router = useRouter();
  const { product_id } = router.query;
  const productId = product_id?.toString();
  const [product, setProduct] = useState<ProductType>();
  const { t } = useTranslation();
  const [addedProduct, setAddedProduct] =
    useState<ProductCartType>(initProductCart);
  const [currentSlide, setCurrentSlide] = useState<string>();
  const isAvailable = useMemo(
    () => (product ? product?.storage_quantity > 0 : false),
    [product]
  );

  const handleGetProduct = useCallback(async () => {
    if (productId) {
      const data = await getProductById(productId);
      setProduct(data);
      setCurrentSlide(data.img);
      setAddedProduct({
        product_id: data._id,
        img: data.img,
        title: data.title,
        price: data.price,
        quantity: 1,
        color: data.colors[0],
      });
    }
  }, [productId]);

  const handleQuantity = (isMinus: boolean) => {
    if (isMinus) {
      if (addedProduct.quantity === 1) return;
      setAddedProduct({ ...addedProduct, quantity: addedProduct.quantity - 1 });
    } else {
      if (addedProduct.quantity === product?.storage_quantity) return;
      setAddedProduct({ ...addedProduct, quantity: addedProduct.quantity + 1 });
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [handleGetProduct]);

  return (
    <Page w='full' direction='column' title={product?.title || 'Product'}>
      <Breadcrumb
        links={[
          { title: t('home'), href: '/' },
          { title: t('products'), href: '/products' },
          { title: product?.title || '', href: '/' },
        ]}
        current={product?.title || ''}
      />
      <Container direction='column'>
        <Flex marginY='2.5rem'>
          <Link href='/products'>
            <Button colorScheme='orange'>
              <Text>{t('back_to_products')}</Text>
            </Button>
          </Link>
        </Flex>
        {product ? (
          <Grid templateColumns='1fr 1fr' gap='2rem'>
            <Flex w='full' direction='column'>
              <Flex
                position='relative'
                w='full'
                h='560px'
                borderRadius='1rem'
                overflow='hidden'
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN}${currentSlide}`}
                  fill
                  alt={product._id}
                />
              </Flex>
              <Grid
                templateColumns='1fr 1fr 1fr 1fr'
                gap='1.5rem'
                h='100px'
                w='full'
                mt='1rem'
              >
                <Flex
                  position='relative'
                  w='full'
                  h='full'
                  borderRadius='0.5rem'
                  cursor='pointer'
                  opacity={currentSlide === product.img ? 1 : 0.7}
                  overflow='hidden'
                  _hover={{ opacity: 1 }}
                  transition='all 200ms ease-in-out'
                  onClick={() => setCurrentSlide(product.img)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN}${product.img}`}
                    style={{ objectFit: 'cover' }}
                    fill
                    alt={product.title}
                  />
                </Flex>
                {product.gallery.map((item) => (
                  <Flex
                    position='relative'
                    w='full'
                    h='full'
                    borderRadius='0.5rem'
                    cursor='pointer'
                    opacity={currentSlide === item ? 1 : 0.7}
                    overflow='hidden'
                    _hover={{ opacity: 1 }}
                    transition='all 200ms ease-in-out'
                    onClick={() => setCurrentSlide(item)}
                    key={item}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CDN}${item}`}
                      fill
                      alt={item}
                    />
                  </Flex>
                ))}
              </Grid>
            </Flex>
            <Flex direction='column' w='full'>
              <Text fontSize='3xl' fontWeight='bold'>
                {product.title}
              </Text>
              <Flex mt='0.25rem' w='full' alignItems='center'>
                <Rating
                  emptyIcon={
                    <StarIcon
                      style={{ width: 24, height: 24, display: 'inline-block' }}
                    />
                  }
                  fillIcon={
                    <StarIcon
                      style={{
                        width: 24,
                        height: 24,
                        fill: 'rgb(255, 188, 11)',
                        display: 'inline-block',
                      }}
                    />
                  }
                  initialValue={product.rating?.rate || 3}
                  readonly
                />
                <Text ml='1rem'>
                  {product.review?.length || 100} {t('customer_review')}
                </Text>
              </Flex>
              <Text mt='0.25rem' fontSize='xl' fontWeight='semibold'>
                ${product.price}
              </Text>
              <Text fontSize='normal' lineHeight={1.8} mt='1rem'>
                {product.description}
              </Text>

              <Grid mt='1rem' templateColumns='150px 1fr'>
                <Text fontWeight='semibold'>{t('available')}:</Text>
                <Text>{isAvailable ? t('in_stock') : t('out_of_stock')}</Text>
              </Grid>
              <Grid mt='0.5rem' templateColumns='150px 1fr'>
                <Text fontWeight='semibold'>{t('sku')}:</Text>
                <Text>{product.sku}</Text>
              </Grid>
              <Grid mt='0.5rem' templateColumns='150px 1fr'>
                <Text fontWeight='semibold'>{t('brand')}:</Text>
                <Text>{t(product.brand)}</Text>
              </Grid>
              <Flex mt='1rem' bg='rgba(0,0,0,0.6)' h='1px' w='full' />
              <Grid mt='1rem' templateColumns='150px 1fr'>
                <Text fontWeight='semibold'>{t('colors')}:</Text>
                <Flex>
                  {product.colors.map((color) => (
                    <ColorButton
                      mr='0.5rem'
                      product_color={color}
                      key={color}
                      active={addedProduct?.color === color || false}
                      onClick={() =>
                        setAddedProduct({ ...addedProduct, color })
                      }
                    />
                  ))}
                </Flex>
              </Grid>
              <Flex alignItems='center' mt='1.5rem'>
                <Button variant='unstyled' onClick={() => handleQuantity(true)}>
                  <MinusIcon />
                </Button>
                <Text
                  marginX='0.5rem'
                  textAlign='center'
                  w='60px'
                  fontWeight='semibold'
                  fontSize='4xl'
                >
                  {addedProduct.quantity}
                </Text>
                <Button
                  variant='unstyled'
                  onClick={() => handleQuantity(false)}
                >
                  <PlusIcon />
                </Button>
              </Flex>
              {isAvailable && (
                <Flex mt='2rem'>
                  <Button colorScheme='orange'>{t('add_to_cart')}</Button>
                </Flex>
              )}
            </Flex>
          </Grid>
        ) : (
          <Grid templateColumns='1fr 1fr' gap='2rem'>
            <Flex w='full' direction='column'>
              <Skeleton w='full' h='500px' borderRadius='1rem' />
              <Grid
                templateColumns='1fr 1fr 1fr 1fr'
                gap='1.5rem'
                h='80px'
                w='full'
                mt='1rem'
              >
                <Skeleton w='full' h='full' />
                <Skeleton w='full' h='full' />
                <Skeleton w='full' h='full' />
                <Skeleton w='full' h='full' />
              </Grid>
            </Flex>
            <Flex direction='column' w='full'>
              <Flex>
                <Skeleton>
                  <Text fontSize='3xl' fontWeight='bold'>
                    Invisible Text
                  </Text>
                </Skeleton>
              </Flex>

              <Flex mt='0.25rem'>
                <Skeleton w='120px' />
                <Skeleton ml='1rem'>
                  <Text>100 customers review</Text>
                </Skeleton>
              </Flex>
              <Flex mt='0.25rem'>
                <Skeleton>
                  <Text fontSize='xl'>$99.99</Text>
                </Skeleton>
              </Flex>
              <SkeletonText
                noOfLines={6}
                mt='1rem'
                spacing={5}
                skeletonHeight={4}
              />
              <Grid mt='1rem' templateColumns='150px 1fr'>
                <Flex>
                  <Skeleton>
                    <Text fontWeight='semibold'>{t('available')}:</Text>
                  </Skeleton>
                </Flex>
                <Skeleton>
                  <Text>Invisible Place</Text>
                </Skeleton>
              </Grid>
              <Grid mt='0.5rem' templateColumns='150px 1fr'>
                <Flex>
                  <Skeleton>
                    <Text fontWeight='semibold'>{t('sku')}:</Text>
                  </Skeleton>
                </Flex>
                <Skeleton>
                  <Text>Invisible Place</Text>
                </Skeleton>
              </Grid>
              <Grid mt='0.5rem' templateColumns='150px 1fr'>
                <Flex>
                  <Skeleton>
                    <Text fontWeight='semibold'>{t('brand')}:</Text>
                  </Skeleton>
                </Flex>
                <Skeleton>
                  <Text>Invisible Place</Text>
                </Skeleton>
              </Grid>
              <Flex mt='1rem' bg='rgba(0,0,0,0.6)' h='1px' w='full' />
              <Grid mt='1rem' templateColumns='150px 1fr'>
                <Flex>
                  <Skeleton>
                    <Text fontWeight='semibold'>{t('colors')}:</Text>
                  </Skeleton>
                </Flex>
                <Skeleton>
                  <Text>Invisible Place</Text>
                </Skeleton>
              </Grid>
            </Flex>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default Product;
