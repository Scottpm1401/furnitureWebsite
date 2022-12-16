import { Flex, FlexProps } from '@chakra-ui/react';
import Link from 'next/link';

type PopupButtonType = {
  href: string;
} & FlexProps;

const PopupButton = ({ href, children, ...props }: PopupButtonType) => {
  return (
    <Flex
      w='60px'
      h='60px'
      p='16px'
      borderRadius='full'
      alignItems='center'
      justifyContent='center'
      _hover={{
        background: 'rgba(0,0,0,0.25)',
      }}
      {...props}
    >
      <Link
        style={{
          width: '100%',
          height: '100%',
        }}
        href={href}
      >
        {children}
      </Link>
    </Flex>
  );
};

export default PopupButton;
