import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

type SlideType = {
  title: string;
  description: string;
  banner: string;
} & FlexProps;

const Slide = ({ title, description, banner, ...props }: SlideType) => {
  const { t } = useTranslation();
  return (
    <Flex w='full' h='full' position='relative' {...props}>
      <Flex
        direction='column'
        position='relative'
        ml={100}
        maxWidth={500}
        h='full'
        justifyContent='center'
        zIndex={2}
      >
        <Text color='white' fontSize='6xl'>
          {title}
        </Text>
        <Text maxWidth='60%' color='white' fontSize='md'>
          {description}
        </Text>
        <Flex mt='16px'>
          <Button variant='ghost' colorScheme='whiteAlpha'>
            <Link href='/products'>
              <Text color='white'>{t('view_more')}</Text>
            </Link>
          </Button>
        </Flex>
      </Flex>
      <Image
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        src={banner}
        fill
        alt='slide_img'
      />
    </Flex>
  );
};

export default Slide;
