import { Button, ButtonProps } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

type SocialIconType = {
  icon: React.ReactNode;
  hoverColor?: string;
  strokeColor?: string;
  href?: string;
} & ButtonProps;

const SocialIcon = ({
  icon,
  hoverColor,
  strokeColor,
  href,
  ...props
}: SocialIconType) => {
  return (
    <Button
      sx={{
        svg: {
          transition: 'all 300ms ease-in-out',
          '&:hover': {
            stroke: strokeColor || 'transparent',
            fill: hoverColor,
          },
        },
      }}
      variant='unstyled'
      w='28px'
      h='28px'
      minW='auto'
      display='flex'
      justifyContent='center'
      alignItems='center'
      borderRadius='full'
      {...props}
    >
      <Link href={href || '#'} target='_blank'>
        {icon}
      </Link>
    </Button>
  );
};

export default SocialIcon;
