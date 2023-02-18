import { Avatar, Flex, FlexProps, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { APP_ROUTES } from '../../constant';
import ShieldIcon from '../../public/svg/shield.svg';
import UserIcon from '../../public/svg/user.svg';
import UserAdvanceIcon from '../../public/svg/user_advance.svg';

type Props = {} & FlexProps;

type settingType = {
  title: string;
  icon: React.ReactNode;
  path: string;
  pageTitle: string;
};

const settingList: settingType[] = [
  {
    title: 'public_profile',
    path: APP_ROUTES.profile,
    icon: <UserIcon />,
    pageTitle: 'Your Profile',
  },
  {
    title: 'additional_info',
    path: APP_ROUTES.additionalInfo,
    icon: <UserAdvanceIcon />,
    pageTitle: 'Profile Advanced',
  },
  {
    title: 'password_and_authentication',
    path: APP_ROUTES.authentication,
    icon: <ShieldIcon />,
    pageTitle: 'Authentication',
  },
];

const ProfileSideBar = ({ ...props }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Flex direction='column' w='360px' pr='1.5rem' {...props}>
      {settingList.map((item) => (
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

export default ProfileSideBar;
