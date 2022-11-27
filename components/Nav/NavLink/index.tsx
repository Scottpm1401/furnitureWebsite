import { Button, ButtonProps, ColorProps, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';

type NavLinkType = {
  title: string;
  href: string;
  textColor?: ColorProps['color'];
} & ButtonProps;

const NavLink = ({ title, href, textColor, ...props }: NavLinkType) => {
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
        <Text fontWeight='semibold' color={textColor ?? 'white'}>
          {title}
        </Text>
      </Link>
    </Button>
  );
};

export default NavLink;
