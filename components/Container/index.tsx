import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

import { useResponsive } from '../../hooks/responsive';

const Container = ({ children, ...props }: FlexProps) => {
  const { isBigScreen } = useResponsive();
  return (
    <Flex
      style={{ width: isBigScreen ? '95vw' : '90vw', margin: '0 auto' }}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Container;
