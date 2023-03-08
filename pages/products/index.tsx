import { Button, Flex, Grid, Select, Text } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Breadcrumb from '../../components/Breadcrumb';
import Container from '../../components/Container';
import ProductCard from '../../components/ProductCard';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import NotAuthProvider from '../../layout/NotAuthProvider';
import Page from '../../layout/Page';
import Sidebar from '../../layout/Sidebar';
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
  const hasMore = useMemo(
    () => products.length !== 0 && products.length % LIMITED === 0,
    [products.length]
  );

  const handleUpdateFilter = async (newFilter: Filter) => {
    setIsLoading(true);
    const data = await getProducts(newFilter);
    if (data) {
      setFilter(newFilter);
      setProducts(data);
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      const newFilter = { ...filter, offset: filter.offset + LIMITED };
      const moreProductLists = await getProducts(newFilter);
      setFilter(newFilter);
      setProducts((prev) => [...prev, ...moreProductLists]);
    } catch (error) {}
  };

  return (
    <NotAuthProvider>
      <Page w='full' direction='column' title='Products'>
        <Breadcrumb
          links={[
            { title: t('home'), href: APP_ROUTES.home },
            { title: t('products'), href: APP_ROUTES.products },
          ]}
          current={t('products')}
        />
        <Container pt='5rem'>
          <Grid w='full' templateColumns={isMobile ? '1fr' : '240px 1fr'}>
            <Sidebar filter={filter} handleUpdateFilter={handleUpdateFilter} />
            <Flex ml={isMobile ? '0' : '1rem'} direction='column'>
              <Grid
                templateColumns={isMobile ? '1fr' : 'auto 1fr auto'}
                alignItems='center'
              >
                <Flex
                  mr={isMobile ? '0' : '2rem'}
                  justifyContent={isMobile ? 'space-between' : 'flex-start'}
                  alignItems='center'
                >
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
                  <Text fontWeight='semibold' w={isMobile ? 'auto' : 'full'}>
                    {products.length} {t('products')}
                  </Text>
                </Flex>

                <Flex display={isMobile ? 'none' : 'flex'} h='1px' bg='black' />
                <Flex
                  ml={isMobile ? '0' : '2rem'}
                  mt={isMobile ? '1rem' : '0'}
                  alignItems='center'
                >
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

              <InfiniteScroll
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    layout === Layout.grid
                      ? isMobile
                        ? '1fr'
                        : isMobileOrTablet
                        ? '1fr 1fr'
                        : '1fr 1fr 1fr'
                      : '1fr',
                  marginTop: '1.5rem',
                  gap: '2rem',
                  overflow: 'unset',
                }}
                next={() => handleLoadMore()}
                hasMore={hasMore}
                loader={
                  <>
                    {new Array(3).fill(0).map((item, index) => (
                      <ProductCard
                        title='loading'
                        image={'/temp'}
                        price={99.99}
                        isLoaded={false}
                        isHorizontal={layout === Layout.list}
                        description='Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal'
                        _id='loading'
                        key={`loading_${index}`}
                      />
                    ))}
                  </>
                }
                dataLength={products.length}
              >
                {isLoading ? (
                  new Array(9)
                    .fill(0)
                    .map((item, index) => (
                      <ProductCard
                        title='loading'
                        image={'/temp'}
                        price={99.99}
                        isLoaded={false}
                        isHorizontal={layout === Layout.list}
                        description='Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal'
                        _id='loading'
                        key={`loading_${index}`}
                      />
                    ))
                ) : products.length === 0 ? (
                  <Text fontWeight='semibold' fontSize='xl'>
                    Product not found
                  </Text>
                ) : (
                  products.map((item) => (
                    <ProductCard
                      key={item._id}
                      title={item.title}
                      image={`${process.env.NEXT_PUBLIC_CDN}${item.img}`}
                      price={item.price}
                      isLoaded={true}
                      isHorizontal={layout === Layout.list}
                      description={item.description}
                      _id={item._id}
                    />
                  ))
                )}
              </InfiniteScroll>
            </Flex>
          </Grid>
        </Container>
      </Page>
    </NotAuthProvider>
  );
};

export default Products;
