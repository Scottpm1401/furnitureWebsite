import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import React from 'react';

import { useResponsive } from '../../hooks/useResponsive';

type TeamCardType = {
  img: string;
  name: string;
  role: string;
} & FlexProps;

const TeamCard = ({ img, name, role, ...props }: TeamCardType) => {
  const { isMobile, isSmallDevice } = useResponsive();
  return (
    <Flex
      direction='column'
      w={isSmallDevice ? '80%' : isMobile ? '50%' : '25%'}
      {...props}
    >
      <Flex
        css={css`
          overflow: hidden;
          img:hover {
            transform: scale(1.05) translateX(5px);
          }
          img {
            transform: scale(1.05) translateX(0px);
          }
        `}
        position='relative'
        w='full'
        h='auto'
        borderRadius='1rem'
      >
        <Image
          style={{
            width: '100%',
            height: 'auto',
            transition: 'transform 200ms ease-in-out',
          }}
          width={800}
          height={1000}
          src={img}
          alt={name}
        />
      </Flex>
      <Text mt='1rem' fontSize='1.5rem' fontWeight='bold'>
        {name}
      </Text>
      <Text
        mt='0.5rem'
        fontSize='1rem'
        textTransform='uppercase'
        color='#464646'
      >
        {role}
      </Text>
    </Flex>
  );
};

export default TeamCard;
