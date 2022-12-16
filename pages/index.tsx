import { Flex } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Newsletter from '../components/Home/Newsletter';
import Section1 from '../components/Home/Section1';
import Section2 from '../components/Home/Section2';
import Section3 from '../components/Home/Section3';
import { ProductType } from '../models/product';
import { getFeaturedProduct } from '../services/product';
type Props = {};

export const getStaticProps = async () => {
  const res = await getFeaturedProduct();
  const featuredProducts: ProductType[] = res.data;
  return {
    props: {
      featuredProducts,
    },
  };
};

const Home = ({
  featuredProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <Flex direction='column'>
      <Section1 />
      <Section2 products={featuredProducts} />
      <Section3 />
      <Newsletter />
    </Flex>
  );
};

export default Home;
