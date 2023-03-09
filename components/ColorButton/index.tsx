import { Button, ButtonProps, Stack } from '@chakra-ui/react';
import React from 'react';

import { ProductColor } from '../../models/product';
import CheckIcon from '../../public/svg/check.svg';

type Props = {
  product_color: ProductColor;
  active: boolean;
  hoverItem?: React.ReactNode;
} & ButtonProps;

const ColorButton = ({ product_color, active, hoverItem, ...props }: Props) => {
  return (
    <Button
      opacity={active ? 1 : 0.6}
      variant='unstyled'
      _hover={{
        '.hover-item': {
          opacity: 1,
        },
      }}
      w='1.5rem'
      h='1.5rem'
      minW='auto'
      p='0.25rem'
      borderRadius='full'
      background={product_color}
      {...props}
    >
      {hoverItem ? (
        <Stack
          className='hover-item'
          opacity={0}
          transition='all 200ms ease-in-out'
          justifyContent='center'
          alignItems='center'
        >
          {hoverItem}
        </Stack>
      ) : (
        <CheckIcon
          style={{
            stroke: 'white',
            transition: 'all 200ms ease-in-out',
            opacity: active ? 1 : 0,
          }}
        />
      )}
    </Button>
  );
};

export default ColorButton;
