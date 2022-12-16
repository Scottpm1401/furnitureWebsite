import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Circle from '../../../../public/svg/circle_3_4.svg';

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
        ml={180}
        maxWidth={500}
        h='full'
        justifyContent='center'
        zIndex={2}
      >
        <Text color='white' fontSize='6xl' fontWeight='semibold'>
          {title}
        </Text>
        <Text maxWidth='60%' color='white' fontSize='md'>
          {description}
        </Text>
        <Flex mt='16px'>
          <Button
            variant='unstyled'
            css={css`
              &:hover circle {
                stroke-dashoffset: 165;
              }
              circle {
                transition: all 0.4s cubic-bezier(0.65, 0.05, 0.36, 1);
                transform: rotate(90deg);
                transform-origin: center;
              }
            `}
          >
            <Link href='/products'>
              <Flex position='absolute' left='0' top='0' w='40px' h='40px'>
                <Circle style={{ color: 'white' }} />
              </Flex>

              <Text ml='20px' mt='17px' color='white' fontWeight='semibold'>
                {t('view_more')}
              </Text>
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
