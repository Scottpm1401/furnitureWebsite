import { Flex, Grid, Text, useBreakpointValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { ProductType } from '../../../models/product';
import Container from '../../Container';
import ProductCard from '../../ProductCard';

type Props = {
  products: ProductType[];
};

const Section2 = ({ products }: Props) => {
  const { t } = useTranslation();
  const responsive = useBreakpointValue(
    {
      md: false,
      base: true,
    },
    {
      fallback: 'md',
    }
  );

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
          mt='2rem'
          gap='2rem'
        >
          {products.map((item, index) => (
            <ProductCard
              key={item._id}
              title={item.title}
              price={item.price}
              image={`${process.env.NEXT_PUBLIC_CDN}${item.img}`}
            />
          ))}
        </Grid>
      </Container>
    </Flex>
  );
};

export default Section2;
