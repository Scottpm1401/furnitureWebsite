import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

import Container from '../../components/Container';
import ProfileSideBar from '../../components/ProfileSideBar';

type Props = {} & FlexProps;

const ProfileContainer = ({ children, ...props }: Props) => {
  return (
    <Flex marginY='4rem' {...props}>
      <Container direction='row'>
        <ProfileSideBar />
        {children}
      </Container>
    </Flex>
  );
};

export default ProfileContainer;
