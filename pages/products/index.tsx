import { Button, Flex, Grid, Select, Text, useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Breadcrumb from '../../components/Breadcrumb';
import ProductCard from '../../components/ProductCard';
import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import Container from '../../layout/Container';
import Page from '../../layout/Page';
import NotAuthProvider from '../../layout/Provider/NotAuthProvider';
import ProductSidebar from '../../layout/SideBar/ProductSidebar';
import { Filter, ProductSort, ProductType } from '../../models/product';
import DropDownIcon from '../../public/svg/drop-down.svg';
import GridIcon from '../../public/svg/grid.svg';
import ListIcon from '../../public/svg/list.svg';
import { getProducts } from '../../services/product';
import { NextApplicationPage } from '../_app';

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

const loadingProduct: ProductType = {
  _id: 'loading',
  img: '/temp',
  gallery: [],
  title: 'loading',
  category: '',
  brand: '',
  price: 99.99,
  sku: '',
  storage_quantity: 1,
  colors: [],
  description:
    'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal',
};

const Products: NextApplicationPage = () => {
  const [filter, setFilter] = useState(initFilter);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState<Layout>(Layout.grid);
  const { t } = useTranslation();
  const { isMobile, isMobileOrTablet } = useResponsive();
  const toast = useToast();
  const hasMore = useMemo(
    () => products.length !== 0 && products.length % LIMITED === 0,
    [products.length]
  );

  const getProductsList = useCallback(async (filter: Filter) => {
    try {
      setIsLoading(true);
      const productsList = await getProducts(filter);
      setProducts(productsList);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateFilter = async (newFilter: Filter) => {
    try {
      await getProductsList(newFilter);
      setFilter(newFilter);
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

  const handleLoadMore = async () => {
    try {
      const newFilter = { ...filter, offset: filter.offset + LIMITED };
      const moreProductLists = await getProducts(newFilter);
      setFilter(newFilter);
      setProducts((prev) => [...prev, ...moreProductLists]);
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

  useEffect(() => {
    getProductsList(initFilter);
  }, [getProductsList]);

  return (
    <Page w='full' direction='column' title={t('products')}>
      <Breadcrumb
        links={[
          { title: t('home'), href: APP_ROUTES.home },
          { title: t('products'), href: APP_ROUTES.products },
        ]}
        current={t('products')}
      />
      <Container pt='5rem'>
        <Grid
          w='full'
          templateColumns={isMobile ? '1fr' : '240px 1fr'}
          position='relative'
        >
          <ProductSidebar
            filter={filter}
            handleUpdateFilter={handleUpdateFilter}
          />
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
                      offset: 0,
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
                      product={loadingProduct}
                      isLoaded={false}
                      isHorizontal={layout === Layout.list}
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
                      product={loadingProduct}
                      isLoaded={false}
                      isHorizontal={layout === Layout.list}
                      key={`loading_${index}`}
                    />
                  ))
              ) : products.length === 0 ? (
                <Text fontWeight='semibold' fontSize='xl'>
                  {t('error.product.not_found')}
                </Text>
              ) : (
                products.map((item) => (
                  <ProductCard
                    key={item._id}
                    product={item}
                    isLoaded={true}
                    isHorizontal={layout === Layout.list}
                    isAvailable={item.storage_quantity > 0}
                  />
                ))
              )}
            </InfiniteScroll>
          </Flex>
        </Grid>
      </Container>
    </Page>
  );
};

Products.getLayout = (page: React.ReactElement) => {
  return <NotAuthProvider>{page}</NotAuthProvider>;
};

export default Products;
