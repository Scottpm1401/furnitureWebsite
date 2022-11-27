import { Flex } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const Section3 = (props: Props) => {
  return (
    <Flex w='full' direction='column'>
      <Flex bg='rgb(231, 225, 216)' w='full' h='300px'></Flex>
      <Flex w='full' transform='translateY(-100px)' h='300px'></Flex>
    </Flex>
  );
};

export default Section3;
