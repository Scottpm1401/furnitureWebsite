import { Flex, FlexProps, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { settingType } from '../../../models/common';

type CommonSideBarProps = {
  settings: settingType[];
} & FlexProps;

const CommonSideBar = ({ settings, ...props }: CommonSideBarProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Flex direction='column' w='360px' pr='1.5rem' {...props}>
      {settings.map((item) => (
        <Link href={item.path} key={item.title}>
          <Flex
            alignItems='center'
            position='relative'
            cursor='pointer'
            mb='1rem'
            p='0.35rem 0.5rem'
            borderRadius='0.5rem'
            transition='all 200ms ease-in-out'
            bg={item.path === router.pathname ? 'orange.200' : 'transparent'}
            _hover={{ bg: 'orange.200' }}
          >
            <Flex w='24px' h='24px' mr='1rem'>
              {item.icon}
            </Flex>
            <Text
              fontSize='sm'
              fontWeight={item.path === router.pathname ? 'bold' : 'semibold'}
            >
              {t(item.title)}
            </Text>
            <Flex
              display={item.path === router.pathname ? 'flex' : 'none'}
              position='absolute'
              left='-10px'
              top='0'
              w='4px'
              bg='orange'
              h='full'
              borderRadius='full'
            />
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};

export default CommonSideBar;
