import { Avatar, Flex, FlexProps, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Container from '../../components/Container';
import ProfileSideBar from '../../components/ProfileSideBar';
import { useResponsive } from '../../hooks/responsive';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';

type Props = {} & FlexProps;

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
          <ProfileSideBar mb={isMobile ? '2rem' : '0'} />
          {children}
        </Flex>
      </Container>
    </Flex>
  );
};

export default ProfileContainer;
