import { Flex, Grid, Text, useBreakpointValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Container from '../../Container';
import ProductCard from '../../ProductCard';

type Props = {};

const Section2 = (props: Props) => {
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
    <Flex bg='#f1f5f8' minHeight={600} paddingY='2.5rem'>
      <Container
        flexDirection='column'
        justifyContent='center'
        textAlign='center'
      >
        <Text color='black' fontSize='4xl' fontWeight='bold'>
          {t('featured_products').toUpperCase()}
        </Text>
        <Grid
          templateColumns={responsive ? '1fr' : '1fr 1fr 1fr'}
          justifyContent='center'
          alignItems='center'
          mt='2rem'
          gap='2rem'
        >
          <ProductCard
            title='Mordern Poster'
            price={30.99}
            image='https://dl.airtable.com/.attachments/e2eef862d9b7a2fb0aa74fa24fbf97bb/25c4bc17/0-pexels-pixabay-462235.jpg'
          />
          <ProductCard
            title='Mordern Poster 2'
            price={99.99}
            image='https://dl.airtable.com/.attachments/e2eef862d9b7a2fb0aa74fa24fbf97bb/25c4bc17/0-pexels-pixabay-462235.jpg'
          />
          <ProductCard
            title='Mordern Poster 3'
            price={199.99}
            image='https://dl.airtable.com/.attachments/e2eef862d9b7a2fb0aa74fa24fbf97bb/25c4bc17/0-pexels-pixabay-462235.jpg'
          />
        </Grid>
      </Container>
    </Flex>
  );
};

export default Section2;
