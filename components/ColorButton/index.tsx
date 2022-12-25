import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

import { ProductColor } from '../../models/product';
import CheckIcon from '../../public/svg/check.svg';

type Props = {
  product_color: ProductColor;
  active: boolean;
} & ButtonProps;

const ColorButton = ({ product_color, active, ...props }: Props) => {
  return (
    <Button
      opacity={active ? 1 : 0.6}
      variant='unstyled'
      w='1.5rem'
      h='1.5rem'
      minW='auto'
      p='0.25rem'
      borderRadius='full'
      background={product_color}
      {...props}
    >
      <CheckIcon
        style={{
          stroke: 'white',
          transition: 'all 200ms ease-in-out',
          opacity: active ? 1 : 0,
        }}
      />
    </Button>
  );
};

export default ColorButton;
