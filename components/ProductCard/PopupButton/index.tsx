import { Flex, FlexProps } from '@chakra-ui/react';

type PopupButtonType = {} & FlexProps;

const PopupButton = ({ children, ...props }: PopupButtonType) => {
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
      {children}
    </Flex>
  );
};

export default PopupButton;
