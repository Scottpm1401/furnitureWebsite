import { Flex, FlexProps, Text, useBreakpointValue } from '@chakra-ui/react';
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
} & FlexProps;

const ProductCard = ({
  title,
  description,
  image,
  price,
  href,
  isHorizontal = false,
  ...props
}: ProductCardType) => {
  const responsive = useBreakpointValue(
    {
      md: 200,
      lg: 280,
      xl: 320,
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
            <ShoppingBagIcon style={{ fill: 'white' }} />
          </PopupButton>
          <PopupButton href='#'>
            <SearchIcon style={{ fill: 'white' }} />
          </PopupButton>
        </Flex>
      </Flex>
      <Flex
        direction={isHorizontal ? 'column' : 'row'}
        justifyContent='space-between'
        mt='0.5rem'
      >
        <Text fontWeight='semibold'>{title}</Text>
        <Text fontWeight='semibold'>${price}</Text>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
