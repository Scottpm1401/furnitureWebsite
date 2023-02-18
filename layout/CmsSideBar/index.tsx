import { Button, Stack, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import SideBarItem from '../../components/SideBarItem';
import { APP_ROUTES } from '../../constant';
import HomeIcon from '../../public/svg/home.svg';
import MenuIcon from '../../public/svg/menu.svg';
import PackageIcon from '../../public/svg/package.svg';
import SettingsIcon from '../../public/svg/settings.svg';
import TaskIcon from '../../public/svg/task.svg';
import UserIcon from '../../public/svg/user.svg';

type Props = {};

const CmsSideBar = (props: Props) => {
  const [isCollapse, setIsCollapse] = useState(false);
  const { t } = useTranslation();

  return (
    <Stack
      w={isCollapse ? '64px' : '260px'}
      transition='all 200ms ease-in-out'
      bg='orange.400'
      paddingY='12px'
      minH='100vh'
      overflow='hidden'
      spacing={0}
    >
      <Stack
        direction='row'
        justifyContent='flex-end'
        paddingX='12px'
        mb='1.5rem'
      >
        <Button
          variant='unstyled'
          padding='4px'
          w='40px'
          h='40px'
          _hover={{ bg: 'blackAlpha.200' }}
          borderRadius='full'
          onClick={() => setIsCollapse(!isCollapse)}
        >
          <MenuIcon style={{ stroke: 'white' }} />
        </Button>
      </Stack>

      <SideBarItem
        icon={<HomeIcon style={{ stroke: 'white' }} />}
        title={t('home')}
        href={APP_ROUTES.cms}
      />
      <SideBarItem
        icon={<UserIcon style={{ stroke: 'white' }} />}
        title={t('users')}
        href={APP_ROUTES.cmsUsers}
      />
      <SideBarItem
        icon={<TaskIcon style={{ fill: 'white' }} />}
        title={t('ordered')}
        href={APP_ROUTES.cmsOrdered}
      />
      <SideBarItem
        icon={<PackageIcon style={{ stroke: 'white' }} />}
        title={t('products')}
        href={APP_ROUTES.cmsProducts}
      />
      <SideBarItem
        icon={<SettingsIcon style={{ stroke: 'white', fill: 'none' }} />}
        title={t('settings')}
        href={APP_ROUTES.cmsSettings}
      />
    </Stack>
  );
};

export default CmsSideBar;
