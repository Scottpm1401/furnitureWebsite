import { Stack, StackProps, Text, TextProps } from '@chakra-ui/react';
import React from 'react';

import { CMS_BG_COLOR } from '../../constant';

type Props = {
  title?: string;
  titleProps?: TextProps;
} & StackProps;

const CmsContainer = ({
  title = 'CMS',
  children,
  titleProps,
  ...props
}: Props) => {
  return (
    <Stack w='full' p='2rem 1.5rem' bg={CMS_BG_COLOR} {...props}>
      <Text fontSize='4xl' fontWeight='semibold' {...titleProps}>
        {title}
      </Text>
      {children}
    </Stack>
  );
};

export default CmsContainer;
