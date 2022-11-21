import { Button, ButtonProps, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';

type NavLinkType = {
  title: string;
  href: string;
} & ButtonProps;

const NavLink = ({ title, href, ...props }: NavLinkType) => {
  return (
    <Button
      css={css`
        &:not(last-child) {
          margin-right: 0.5rem;
        }
      `}
      variant='ghost'
      colorScheme='blackAlpha'
      {...props}
    >
      <Link href={href}>
        <Text fontWeight='semibold' color='white'>
          {title}
        </Text>
      </Link>
    </Button>
  );
};

export default NavLink;
