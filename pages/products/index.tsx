import { Button, Flex, Grid, Select, Text } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import Container from '../../components/Container';
import ProductCard from '../../components/ProductCard';
import Sidebar from '../../components/Sidebar';
import { useResponsive } from '../../hooks/useResponsive';
import NotAuthProvider from '../../layout/NotAuthProvider';
import Page from '../../layout/Page';
import { Filter, ProductSort, ProductType } from '../../models/product';
import DropDownIcon from '../../public/svg/drop-down.svg';
import GridIcon from '../../public/svg/grid.svg';
import ListIcon from '../../public/svg/list.svg';
import { getProducts } from '../../services/product';

const LIMITED = 9;

const initFilter: Filter = {
  offset: 0,
  limit: LIMITED,
  sort: ProductSort.price_asc,
};

enum Layout {
  grid = 'GRID',
  list = 'LIST',
}

export const getStaticProps = async () => {
  const productsList = await getProducts(initFilter);
  return {
    props: {
      productsList,
    },
  };
};

const Products = ({
  productsList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filter, setFilter] = useState(initFilter);
  const [products, setProducts] = useState<ProductType[]>(productsList);
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState<Layout>(Layout.grid);
  const { t } = useTranslation();
  const { isMobile, isMobileOrTablet } = useResponsive();

  const handleUpdateFilter = async (newFilter: Filter) => {
    setIsLoading(true);
    const data = await getProducts(newFilter);
    if (data) {
      setFilter(newFilter);
      setProducts(data);
      setIsLoading(false);
    }
  };

  return (
    <NotAuthProvider>
      <Page w='full' direction='column' title='Products'>
        <Breadcrumb
          links={[
            { title: t('home'), href: '/' },
            { title: t('products'), href: '/products' },
          ]}
          current={t('products')}
        />
        <Container pt='5rem'>
          <Grid w='full' templateColumns='240px 1fr'>
            <Sidebar filter={filter} handleUpdateFilter={handleUpdateFilter} />
            <Flex ml='1rem' direction='column'>
              <Grid templateColumns='auto auto 1fr auto' alignItems='center'>
                <Flex mr='2rem'>
                  <Button
                    variant='unstyled'
                    w='1.75rem'
                    h='1.75rem'
                    p='0.25rem'
                    borderRadius='0.25rem'
                    border='1px solid black'
                    minW='auto'
                    bg={layout === Layout.grid ? 'black' : 'white'}
                    onClick={() => setLayout(Layout.grid)}
                  >
                    <GridIcon
                      style={{
                        fill: 'white',
                        stroke: layout === Layout.grid ? 'white' : 'black',
                      }}
                    />
                  </Button>
                  <Button
                    variant='unstyled'
                    w='1.75rem'
                    h='1.75rem'
                    p='0.25rem'
                    borderRadius='0.25rem'
                    border='1px solid black'
                    minW='auto'
                    ml='0.5rem'
                    bg={layout === Layout.list ? 'black' : 'white'}
                    onClick={() => setLayout(Layout.list)}
                  >
                    <ListIcon
                      style={{
                        fill: 'white',
                        stroke: layout === Layout.list ? 'white' : 'black',
                      }}
                    />
                  </Button>
                </Flex>
                <Text fontWeight='semibold' w='full' mr='2rem'>
                  {products.length} {t('products')}
                </Text>
                <Flex h='1px' bg='black' />
                <Flex ml='2rem' alignItems='center'>
                  <Text fontWeight='semibold' whiteSpace='nowrap'>
                    {t('sort_by')}
                  </Text>
                  <Select
                    variant='unstyled'
                    cursor='pointer'
                    ml='1rem'
                    icon={<DropDownIcon style={{ width: 24, height: 24 }} />}
                    value={filter.sort}
                    onChange={(e) =>
                      handleUpdateFilter({
                        ...filter,
                        sort: e.target.value as ProductSort,
                      })
                    }
                  >
                    {Object.values(ProductSort).map((value) => (
                      <option value={value} key={value}>
                        {t(value)}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Grid>
              <Grid
                mt='1.5rem'
                gridTemplateColumns={
                  layout === Layout.grid
                    ? isMobileOrTablet
                      ? '1fr 1fr'
                      : '1fr 1fr 1fr'
                    : '1fr'
                }
                gap='2rem'
              >
                {products.map((item) => (
                  <ProductCard
                    key={item._id}
                    title={item.title}
                    image={`${process.env.NEXT_PUBLIC_CDN}${item.img}`}
                    price={item.price}
                    isLoaded={!isLoading}
                    isHorizontal={layout === Layout.list}
                    description={item.description}
                    _id={item._id}
                  />
                ))}
              </Grid>
            </Flex>
          </Grid>
        </Container>
      </Page>
    </NotAuthProvider>
  );
};

export default Products;
