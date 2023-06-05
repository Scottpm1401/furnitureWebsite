import {
  Button,
  ButtonProps,
  Flex,
  HStack,
  Text,
  TextProps,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { useResponsive } from '../../../hooks/responsive';

type NavLinkType = {
  title: string;
  href: string;
  textProps?: TextProps;
  direction?: 'left' | 'center';
  isSpacing?: boolean;
  icon?: React.ReactNode;
} & ButtonProps;

const NavLink = ({
  title,
  href,
  textProps,
  direction = 'center',
  isSpacing = true,
  icon,
  ...props
}: NavLinkType) => {
  const { isMobile } = useResponsive();

  return (
    <Button
      sx={{
        '&:not(last-child)': {
          marginRight: isSpacing ? '2rem' : '0',
        },
      }}
      _hover={{
        '.underline': {
          width: '100%',
        },
      }}
      display='flex'
      justifyContent={direction === 'center' ? 'center' : 'flex-start'}
      variant='unstyled'
      w='fit-content'
      {...props}
    >
      <Link
        style={{
          width: isMobile ? '100%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: direction === 'center' ? 'center' : 'flex-start',
          alignItems: direction === 'center' ? 'center' : 'flex-start',
        }}
        href={href}
      >
        <HStack alignItems='center' spacing='1rem'>
          {icon}
          <Text fontWeight='medium' {...textProps}>
            {title}
          </Text>
        </HStack>

        <Flex
          className='underline'
          h='1px'
          w='0px'
          transition='all 300ms ease-in-out'
          background={textProps?.color || 'white'}
        />
      </Link>
    </Button>
  );
};

export default NavLink;
