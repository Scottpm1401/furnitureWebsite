import {
  Flex,
  FlexProps,
  Skeleton,
  SkeletonText,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import React from 'react';

import SearchIcon from '../../public/svg/search.svg';
import ShoppingBagIcon from '../../public/svg/shopping_bag.svg';
import PopupButton from './PopupButton';

type ProductCardType = {
  title: string;
  description?: string;
  image: string;
  price: number;
  isHorizontal?: boolean;
  href?: string;
  isLoaded?: boolean;
} & FlexProps;

const ProductCard = ({
  title,
  description,
  image,
  price,
  href,
  isHorizontal = false,
  isLoaded = false,
  ...props
}: ProductCardType) => {
  const responsive = useBreakpointValue(
    {
      md: 200,
      lg: 280,
      xl: 360,
      '2xl': 440,
      base: 280,
    },
    {
      fallback: 'md',
    }
  );
  return (
    <Flex
      position='relative'
      cursor='pointer'
      w='full'
      h={responsive}
      direction={isHorizontal ? 'row' : 'column'}
      {...props}
    >
      <Skeleton
        w='full'
        h='full'
        borderRadius='1rem'
        overflow='hidden'
        isLoaded={isLoaded}
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
            <PopupButton href='#'>
              <ShoppingBagIcon style={{ fill: 'none', stroke: 'white' }} />
            </PopupButton>
            <PopupButton href='#'>
              <SearchIcon style={{ fill: 'none', stroke: 'white' }} />
            </PopupButton>
          </Flex>
        </Flex>
      </Skeleton>

      <Flex
        direction={isHorizontal ? 'column' : 'row'}
        justifyContent='space-between'
        mt='0.75rem'
      >
        <Skeleton isLoaded={isLoaded}>
          <Text fontWeight='semibold'>{title}</Text>
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Text fontWeight='semibold'>${price}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
