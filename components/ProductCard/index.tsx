import {
  Flex,
  Grid,
  GridProps,
  Skeleton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import { useCart } from '../../hooks/user';
import { ProductCartType } from '../../models/cart';
import { ProductType } from '../../models/product';
import SearchIcon from '../../public/svg/search.svg';
import ShoppingBagIcon from '../../public/svg/shopping_bag.svg';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';
import PopupButton from './PopupButton';

type ProductCardProps = {
  product: ProductType;
  isHorizontal?: boolean;
  href?: string;
  isLoaded?: boolean;
  isAvailable?: boolean;
} & GridProps;

const ProductCard = ({
  product,
  href,
  isHorizontal = false,
  isLoaded = false,
  isAvailable = true,
  ...props
}: ProductCardProps) => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const responsive = useBreakpointValue(
    {
      sm: 600,
      md: 360,
      lg: 280,
      xl: 400,
      '2xl': 440,
      base: 400,
    },
    {
      fallback: 'md',
    }
  );
  const userId = useAppSelector(selectors.user.selectUserId);
  const { handleAddProduct } = useCart();

  return (
    <Grid
      position='relative'
      w='full'
      h={isHorizontal && isMobile ? '460px' : responsive}
      templateColumns={isHorizontal && !isMobile ? '400px 1fr' : 'auto'}
      templateRows={isHorizontal ? 'auto' : '1fr auto'}
      {...props}
    >
      <Skeleton
        cursor='pointer'
        w='full'
        borderRadius='1rem'
        overflow='hidden'
        isLoaded={isLoaded}
        h={isHorizontal && isMobile ? '280px' : 'full'}
      >
        <Flex
          w='full'
          h='full'
          position='relative'
          _hover={{
            '.popup': {
              visibility: 'visible',
              opacity: 1,
              zIndex: 1,
            },
          }}
          onClick={() =>
            isLoaded && router.push(APP_ROUTES.product(product._id))
          }
        >
          <Image
            style={{ objectFit: 'cover' }}
            src={`${process.env.NEXT_PUBLIC_CDN}${product.img}`}
            fill
            sizes='(max-width: 768px) 100vw,
              (max-width: 1280px) 50vw,
              33vw'
            alt={product.title}
          />
          <Flex
            className='popup'
            position='absolute'
            top='0px'
            left='0px'
            w='full'
            h='full'
            visibility='hidden'
            zIndex={0}
            opacity={0}
            transition='all 300ms ease-in-out'
            background='blackAlpha.600'
            justifyContent='center'
            alignItems='center'
            gap='1rem'
            borderRadius='1rem'
          >
            {userId && isAvailable && (
              <PopupButton
                onClick={(e) => {
                  e.stopPropagation();
                  const addedProduct: ProductCartType = {
                    product_id: product._id,
                    img: product.img,
                    title: product.title,
                    price: product.price,
                    color: product.colors[0],
                    quantity: 1,
                    brand: product.brand,
                    category: product.category,
                  };
                  handleAddProduct(addedProduct);
                }}
              >
                <ShoppingBagIcon style={{ fill: 'none', stroke: 'white' }} />
              </PopupButton>
            )}

            <PopupButton
              onClick={(e) => {
                e.stopPropagation();
                router.push(APP_ROUTES.product(product._id));
              }}
            >
              <SearchIcon style={{ fill: 'none', stroke: 'white' }} />
            </PopupButton>
          </Flex>
        </Flex>
      </Skeleton>

      <Flex
        direction={isHorizontal ? 'column' : 'row'}
        justifyContent={
          isHorizontal ? (isMobile ? 'flex-start' : 'center') : 'space-between'
        }
        mt={isHorizontal ? '0' : '0.75rem'}
        w='full'
        h='full'
        ml={isHorizontal && !isMobile ? '2rem' : '0'}
      >
        <Skeleton isLoaded={isLoaded}>
          <Text fontWeight='semibold' fontSize={isHorizontal ? '2xl' : 'md'}>
            {product.title}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Text fontWeight='semibold'>${product.price}</Text>
        </Skeleton>
        {isHorizontal && (
          <Skeleton w='full' mt='0.5rem' isLoaded={isLoaded}>
            <Text>
              {product.description?.slice(0, 150)}
              {product.description && product.description.length > 150 && '...'}
            </Text>
          </Skeleton>
        )}
      </Flex>
    </Grid>
  );
};

export default ProductCard;
