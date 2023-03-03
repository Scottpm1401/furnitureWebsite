import {
  Avatar,
  Flex,
  IconButton,
  Link,
  Stack,
  StackProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { APP_ROUTES, CMS_BG_COLOR } from '../../constant';
import BackIcon from '../../public/svg/back.svg';
import { useAppSelector } from '../../redux/hooks';
import { selectors } from '../../redux/reducer';

type Props = {
  title?: string;
  titleProps?: TextProps;
  href?: string;
  containerProps?: StackProps;
} & StackProps;

const CmsContainer = ({
  title = 'CMS',
  children,
  titleProps,
  href,
  containerProps,
  ...props
}: Props) => {
  const router = useRouter();
  const user = useAppSelector(selectors.user.selectUser);

  return (
    <Stack w='full' {...containerProps}>
      <Stack
        direction='row'
        p='1rem 1.5rem'
        bg='white'
        justifyContent={href ? 'space-between' : 'flex-end'}
      >
        {href && (
          <IconButton
            w='40px'
            variant='unstyled'
            icon={<BackIcon />}
            aria-label='back-icon'
            onClick={() => router.push(href)}
          />
        )}

        <Link href={APP_ROUTES.cmsUser(user._id)}>
          <Flex w='40px' h='40px'>
            <Avatar
              w='full'
              h='full'
              src={`${process.env.NEXT_PUBLIC_CDN}/${user.info?.avatar}`}
              name={user?.displayName}
            />
          </Flex>
        </Link>
      </Stack>
      <Stack w='full' h='full' p='2rem 1.5rem' bg={CMS_BG_COLOR} {...props}>
        <Text fontSize='4xl' mb='1rem' fontWeight='semibold' {...titleProps}>
          {title}
        </Text>
        {children}
      </Stack>
    </Stack>
  );
};

export default CmsContainer;
