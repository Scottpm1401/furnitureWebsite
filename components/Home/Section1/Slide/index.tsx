import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { APP_ROUTES } from '../../../../constant';
import { useResponsive } from '../../../../hooks/responsive';
import Circle from '../../../../public/svg/circle_3_4.svg';

type SlideType = {
  title: string;
  description: string;
  banner: string;
} & FlexProps;

const Slide = ({ title, description, banner, ...props }: SlideType) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  return (
    <Flex w='full' h='full' position='relative' {...props}>
      <Flex
        direction='column'
        position='relative'
        ml={isMobile ? 8 : 180}
        maxWidth={700}
        h='full'
        justifyContent='center'
        zIndex={2}
        overflow={isMobile ? 'hidden' : 'initial'}
      >
        <Text
          color='white'
          fontSize={isMobile ? '3xl' : '6xl'}
          fontWeight='semibold'
        >
          {title}
        </Text>
        {!isMobile && (
          <Text maxWidth='80%' color='white' fontSize='md'>
            {description}
          </Text>
        )}

        <Flex mt='1.5rem'>
          <Button
            variant='unstyled'
            sx={{
              circle: {
                transition: 'all 0.4s cubic-bezier(0.65, 0.05, 0.36, 1)',
                transform: 'rotate(90deg)',
                transformOrigin: 'center',
              },
            }}
            _hover={{
              circle: {
                strokeDashoffset: 165,
              },
            }}
          >
            <Link href={APP_ROUTES.products}>
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
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          objectFit: 'cover',
        }}
        src={banner}
        fill
        sizes='100vw'
        alt='slide_img'
      />
    </Flex>
  );
};

export default Slide;
