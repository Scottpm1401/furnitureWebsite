import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  Flex,
  FlexProps,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import Container from '../../layout/Container';

type BreadcrumbLink = {
  title: string;
  href: string;
};

type BreadcrumbType = {
  links: BreadcrumbLink[];
  current: string;
  separator?: string;
} & FlexProps;

const Breadcrumb = ({
  links,
  current,
  separator = '/',
  ...props
}: BreadcrumbType) => {
  return (
    <Flex
      direction='column'
      w='full'
      h='20vh'
      bg='orange.200'
      justifyContent='center'
      fontSize='3xl'
      fontWeight='semibold'
      {...props}
    >
      <Container>
        <ChakraBreadcrumb
          sx={{
            ol: {
              flexWrap: 'wrap',
            },
          }}
          separator={separator}
        >
          {links.map((item, index) => (
            <BreadcrumbItem key={`${item.title}_${index}`}>
              {item.title === current ? (
                <Text color='blackAlpha.600'>{item.title}</Text>
              ) : (
                <Link href={item.href}>
                  <Text>{item.title}</Text>
                </Link>
              )}
            </BreadcrumbItem>
          ))}
        </ChakraBreadcrumb>
      </Container>
    </Flex>
  );
};

export default Breadcrumb;
