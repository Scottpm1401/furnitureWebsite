import { Flex, FlexProps } from '@chakra-ui/react';
import Link from 'next/link';

type PopupButtonType = {
  href: string;
} & FlexProps;

const PopupButton = ({ href, children, ...props }: PopupButtonType) => {
  return (
    <Link
      style={{
        width: 60,
        height: 60,
      }}
      href={href}
    >
      <Flex
        w='full'
        h='full'
        p='16px'
        borderRadius='full'
        alignItems='center'
        justifyContent='center'
        _hover={{
          background: 'rgba(0,0,0,0.25)',
        }}
        {...props}
      >
        {children}
      </Flex>
    </Link>
  );
};

export default PopupButton;
