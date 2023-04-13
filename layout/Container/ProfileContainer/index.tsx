import { Avatar, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { APP_ROUTES } from '../../../constant';
import { useResponsive } from '../../../hooks/responsive';
import { settingType } from '../../../models/common';
import ShieldIcon from '../../../public/svg/shield.svg';
import UserIcon from '../../../public/svg/user.svg';
import UserAdvanceIcon from '../../../public/svg/user_advance.svg';
import { useAppSelector } from '../../../redux/hooks';
import { selectors } from '../../../redux/reducer';
import CommonSideBar from '../../SideBar/CommonSideBar';
import Container from '..';

type Props = {} & FlexProps;

const settingList: settingType[] = [
  {
    title: 'public_profile',
    path: APP_ROUTES.profile,
    icon: <UserIcon />,
  },
  {
    title: 'additional_info',
    path: APP_ROUTES.additionalInfo,
    icon: <UserAdvanceIcon />,
  },
  {
    title: 'password_and_authentication',
    path: APP_ROUTES.authentication,
    icon: <ShieldIcon />,
  },
];

const ProfileContainer = ({ children, ...props }: Props) => {
  const user = useAppSelector(selectors.user.selectUser);
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  return (
    <Flex marginY='2.5rem' {...props}>
      <Container direction='column'>
        <Flex alignItems='center'>
          <Flex mr='0.5rem' w='48px' h='48px'>
            <Avatar
              w='full'
              h='full'
              src={`${process.env.NEXT_PUBLIC_CDN}${user.info?.avatar}`}
              name={user?.displayName}
            />
          </Flex>
          <Flex direction='column'>
            <Text fontWeight='semibold' fontSize='xl'>
              {user.displayName}
            </Text>
            <Text>{t('your_personal_account')}</Text>
          </Flex>
        </Flex>
        <Flex direction={isMobile ? 'column' : 'row'} mt='2rem'>
          <CommonSideBar settings={settingList} mb={isMobile ? '2rem' : '0'} />
          {children}
        </Flex>
      </Container>
    </Flex>
  );
};

export default ProfileContainer;
