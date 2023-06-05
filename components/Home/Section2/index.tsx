import {
  Button,
  Flex,
  Grid,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useState } from 'react';

import { APP_ROUTES } from '../../../constant';
import Container from '../../../layout/Container';
import { ProductType } from '../../../models/product';
import AshleyIcon from '../../../public/svg/ashley.svg';
import HabitatIcon from '../../../public/svg/habitat.svg';
import IkeaIcon from '../../../public/svg/ikea.svg';
import MaisonsDuMondeIcon from '../../../public/svg/maisons-du-monde.svg';
import WilliamsIcon from '../../../public/svg/williams-sonoma.svg';
import { getFeaturedProduct } from '../../../services/product';
import ProductCard from '../../ProductCard';

const Section2 = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ProductType[]>([]);
  const toast = useToast();
  const responsive = useBreakpointValue(
    {
      md: false,
      base: true,
    },
    {
      fallback: 'md',
    }
  );

  const getProductsList = useCallback(async () => {
    try {
      const productsList = await getFeaturedProduct();
      setProducts(productsList);
    } catch (err) {
      if (isAxiosError(err))
        toast({
          title: t(err.response?.data.message),
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
    }
  }, [t, toast]);

  useEffect(() => {
    getProductsList();
  }, [getProductsList]);

  return (
    <Flex bg='#f1f5f8' minHeight={600} paddingY='7rem'>
      <Container
        flexDirection='column'
        justifyContent='center'
        textAlign='center'
      >
        <Text color='black' fontSize='4xl' fontWeight={600}>
          {t('featured_products')}
        </Text>
        <Grid
          templateColumns={responsive ? '1fr' : '1fr 1fr 1fr'}
          justifyContent='center'
          alignItems='center'
          mt='2.5rem'
          gap='2rem'
        >
          {products.map((item, index) => (
            <ProductCard
              key={item._id}
              product={item}
              isLoaded={true}
              isAvailable={item.storage_quantity > 0}
            />
          ))}
        </Grid>
        <Flex mt='5rem' justifyContent='center'>
          <Link href={APP_ROUTES.products}>
            <Button
              variant='outline'
              _hover={{
                background: 'rgba(0,0,0,0.05)',
              }}
              colorScheme='black'
            >
              <Text>{t('view_more')}</Text>
            </Button>
          </Link>
        </Flex>

        <Flex
          mt='5rem'
          alignItems='center'
          justifyContent='center'
          wrap='wrap'
          sx={{
            svg: {
              width: '300px',
              height: '150px',
              transition: 'all 200ms ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            },
          }}
        >
          <Link href='https://www.ashleyfurniture.com/' target='_blank'>
            <AshleyIcon />
          </Link>

          <Link href='https://www.ikea.com/' target='_blank'>
            <IkeaIcon />
          </Link>
          <Link href='https://www.maisonsdumonde.com/' target='_blank'>
            <MaisonsDuMondeIcon
              style={{
                paddingBottom: 28,
                paddingTop: 43,
                paddingLeft: 36,
                paddingRight: 36,
              }}
            />
          </Link>
          <Link href='https://www.habitat.co.uk' target='_blank'>
            <HabitatIcon
              style={{
                paddingBottom: 43,
                paddingTop: 43,
                paddingLeft: 36,
                paddingRight: 36,
              }}
            />
          </Link>
          <Link href='https://www.williams-sonoma.com/' target='_blank'>
            <WilliamsIcon
              style={{
                paddingBottom: 24,
                paddingTop: 43,
                paddingLeft: 36,
                paddingRight: 36,
              }}
            />
          </Link>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Section2;
