import { Button, Stack, StackProps, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { APP_ROUTES } from '../../../../constant';

type Props = {
  icon: React.ReactNode;
  title: string;
  href: string;
} & StackProps;

const CmsSideBarItem = ({ title, icon, href, ...props }: Props) => {
  const router = useRouter();

  const isSelected = useMemo(() => {
    if (
      href === APP_ROUTES.cms.dashboard &&
      router.pathname !== APP_ROUTES.cms.dashboard
    )
      return false;
    return router.pathname.includes(href);
  }, [href, router.pathname]);

  return (
    <Stack
      direction='row'
      alignItems='center'
      p='8px 12px'
      spacing={3}
      cursor='pointer'
      transition='all 200ms ease-in-out'
      _hover={{
        bg: 'blackAlpha.800',
      }}
      bg={isSelected ? 'blackAlpha.800' : 'initial'}
      onClick={() => router.push(href)}
      {...props}
    >
      <Button variant='unstyled' padding='4px' w='40px' h='40px'>
        {icon}
      </Button>
      <Text fontWeight='semibold' minW='140px' color='white'>
        {title}
      </Text>
    </Stack>
  );
};

export default CmsSideBarItem;
