import { Flex, FlexProps } from '@chakra-ui/react';
import Link from 'next/link';

type PopupButtonType = {
  href: string;
} & FlexProps;

const PopupButton = ({ href, children, ...props }: PopupButtonType) => {
  return (
    <Flex w='26px' h='26px' p='4px' border='1px solid white' {...props}>
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
