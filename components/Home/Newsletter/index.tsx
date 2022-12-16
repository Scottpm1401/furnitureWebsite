import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

import Container from '../../Container';
type Props = {} & FlexProps;

const Newsletter = ({ ...props }: Props) => {
  return <Container {...props}>Newsletter</Container>;
};

export default Newsletter;
