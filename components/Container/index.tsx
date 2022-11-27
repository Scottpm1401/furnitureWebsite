import { Flex, FlexProps, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

const Container = ({ children, ...props }: FlexProps) => {
  const maxWidth = useBreakpointValue(
    {
      md: '90vw',
      xl: '95vw',
      base: '90vw',
    },
    {
      fallback: 'md',
    }
  );
  return (
    <Flex style={{ width: maxWidth, margin: '0 auto' }} {...props}>
      {children}
    </Flex>
  );
};

export default Container;
