import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Input,
  Link,
  Stack,
  StackProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { APP_ROUTES, CMS_BG_COLOR } from '../../../constant';
import BackIcon from '../../../public/svg/back.svg';
import DownloadIcon from '../../../public/svg/download.svg';
import { useAppSelector } from '../../../redux/hooks';
import { selectors } from '../../../redux/reducer';
import { formatDate } from '../../../utils/common';

type Props = {
  title?: string;
  titleProps?: TextProps;
  href?: string;
  containerProps?: StackProps;
  search?: {
    handleSearch: (offset: number, limit: number, search: string) => void;
  };
  rightElement?: React.ReactNode;
} & StackProps;

const CmsContainer = ({
  title = 'CMS',
  children,
  titleProps,
  href,
  containerProps,
  search,
  rightElement,

  ...props
}: Props) => {
  const user = useAppSelector(selectors.user.selectUser);
  const { t } = useTranslation();
  const router = useRouter();

  const debounceSearch = debounce(
    (value) => search?.handleSearch(0, Number(router.query.limit), value),
    300
  );

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

        <Link href={APP_ROUTES.cms.users.index(user._id)}>
          <Flex w='40px' h='40px'>
            <Avatar
              w='full'
              h='full'
              src={`${process.env.NEXT_PUBLIC_CDN}${user.info?.avatar}`}
              name={user?.displayName}
            />
          </Flex>
        </Link>
      </Stack>
      <Stack w='full' h='full' p='2rem 1.5rem' bg={CMS_BG_COLOR} {...props}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          w='full'
        >
          <Stack direction='row' alignItems='center' mb='1rem' spacing={4}>
            <Text fontSize='4xl' fontWeight='semibold' {...titleProps}>
              {title}
            </Text>
          </Stack>

          <Stack direction='row' alignItems='center' spacing={4}>
            {search && (
              <Input
                w='300px'
                placeholder={t('search_place_holder')}
                onChange={(e) => debounceSearch(e.target.value)}
              />
            )}
            {rightElement}
          </Stack>
        </Stack>

        {children}
      </Stack>
    </Stack>
  );
};

export default CmsContainer;
