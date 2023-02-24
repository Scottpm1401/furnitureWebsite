import {
  Flex,
  FlexProps,
  Input,
  InputProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  textProps?: TextProps;
  inputProps?: InputProps;
  title: string;
  disabled?: boolean;
  error?: React.ReactNode;
} & FlexProps;

const CustomInput = ({
  textProps,
  inputProps,
  title,
  disabled = false,
  error,
  ...props
}: Props) => {
  return (
    <Flex direction='column' w='full' {...props}>
      <Text fontWeight='semibold' {...textProps}>
        {title}
      </Text>
      <Input disabled={disabled} {...inputProps} />
      {error}
    </Flex>
  );
};

export default CustomInput;
