import { Flex, FlexProps, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { useResponsive } from '../../hooks/responsive';

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
        overflow='hidden'
        position='relative'
        w='full'
        h='auto'
        borderRadius='1rem'
        sx={{
          img: {
            transform: 'scale(1.05) translateX(0px)',
            '&:hover': {
              transform: 'scale(1.05) translateX(5px)',
            },
          },
        }}
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
