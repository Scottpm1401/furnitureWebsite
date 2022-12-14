import {
  Flex,
  Grid,
  GridProps,
  Skeleton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { useResponsive } from '../../hooks/useResponsive';
import SearchIcon from '../../public/svg/search.svg';
import ShoppingBagIcon from '../../public/svg/shopping_bag.svg';
import PopupButton from './PopupButton';

type ProductCardType = {
  _id: string;
  title: string;
  description?: string;
  image: string;
  price: number;
  isHorizontal?: boolean;
  href?: string;
  isLoaded?: boolean;
} & GridProps;

const ProductCard = ({
  _id,
  title,
  description,
  image,
  price,
  href,
  isHorizontal = false,
  isLoaded = false,
  ...props
}: ProductCardType) => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const responsive = useBreakpointValue(
    {
      md: 200,
      lg: 280,
      xl: 400,
      '2xl': 440,
      base: 280,
    },
    {
      fallback: 'md',
    }
  );
  return (
    <Grid
      position='relative'
      w='full'
      h={isHorizontal && isMobile ? '460px' : responsive}
      templateColumns={isHorizontal && !isMobile ? '360px 1fr' : 'auto'}
      templateRows={isHorizontal ? 'auto' : '1fr auto'}
      onClick={() => isLoaded && router.push(`/products/${_id}`)}
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
          css={css`
            &:hover .popup {
              visibility: visible;
              opacity: 1;
              z-index: 1;
            }
          `}
        >
          <Image src={image} fill alt={title} />
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
          >
            <PopupButton
              href='#'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ShoppingBagIcon style={{ fill: 'none', stroke: 'white' }} />
            </PopupButton>
            <PopupButton
              href={`/products/${_id}`}
              onClick={(e) => {
                e.stopPropagation();
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
            {title}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Text fontWeight='semibold'>${price}</Text>
        </Skeleton>
        {isHorizontal && (
          <Skeleton w='full' mt='0.5rem' isLoaded={isLoaded}>
            <Text>
              {description?.slice(0, 150)}
              {description && description.length > 150 && '...'}
            </Text>
          </Skeleton>
        )}
      </Flex>
    </Grid>
  );
};

export default ProductCard;
