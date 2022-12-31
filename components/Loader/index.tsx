import { CircularProgress, Flex } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const Loader = (props: Props) => {
  return (
    <Flex
      position='fixed'
      zIndex={99}
      w='full'
      h='full'
      justifyContent='center'
      alignItems='center'
      bg='white'
    >
      <CircularProgress isIndeterminate color='orange.300' size='72px' />
    </Flex>
  );
};

export default Loader;
