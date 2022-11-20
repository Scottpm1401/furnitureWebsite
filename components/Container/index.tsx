import { Flex, FlexProps, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

const Container = ({ children, ...props }: FlexProps) => {
  const maxWidth = useBreakpointValue({
    sm: '90vw',
    md: '90vw',
    lg: '90vw',
    xl: '95vw',
  });
  return (
    <Flex style={{ maxWidth, margin: '0 auto' }} {...props}>
      {children}
    </Flex>
  );
};

export default Container;
