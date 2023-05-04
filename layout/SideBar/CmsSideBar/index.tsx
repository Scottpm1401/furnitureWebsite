import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { APP_ROUTES } from '../../../constant';
import { useResponsive } from '../../../hooks/responsive';
import HomeIcon from '../../../public/svg/home.svg';
import LanguageIcon from '../../../public/svg/language.svg';
import TemplateIcon from '../../../public/svg/layout.svg';
import LogoutIcon from '../../../public/svg/log-out.svg';
import MenuIcon from '../../../public/svg/menu.svg';
import PackageIcon from '../../../public/svg/package.svg';
import TaskIcon from '../../../public/svg/task.svg';
import UserCheckIcon from '../../../public/svg/user-check.svg';
import UsersIcon from '../../../public/svg/users.svg';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { actions, selectors } from '../../../redux/reducer';
import SideBarItem from './CmsSideBarItem';

const CmsSideBar = () => {
  const router = useRouter();
  const isCollapse = useAppSelector(selectors.global.selectIsCollapse);
  const dispatch = useAppDispatch();
  const { t, lang } = useTranslation();
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const { isTabletOrLaptop } = useResponsive();

  const handleChangeLanguage = async (lang: string) => {
    moment.locale(lang);
    await setLanguage(lang);
    setIsOpenLanguage(false);
  };

  return (
    <Stack
      minW={isTabletOrLaptop || isCollapse ? '64px' : '260px'}
      maxW={isTabletOrLaptop || isCollapse ? '64px' : '260px'}
      transition='all 200ms ease-in-out'
      bg='orange.300'
      paddingY='12px'
      minH='100vh'
      overflow='hidden'
      justifyContent='space-between'
    >
      <Stack spacing='1.5rem'>
        <Stack direction='row' justifyContent='flex-end' paddingX='12px'>
          <Button
            variant='unstyled'
            padding='4px'
            w='40px'
            h='40px'
            _hover={{ bg: 'blackAlpha.200' }}
            borderRadius='full'
            onClick={() => dispatch(actions.global.setIsCollapse(!isCollapse))}
          >
            <MenuIcon style={{ stroke: 'white' }} />
          </Button>
        </Stack>
        <Stack spacing={0}>
          <SideBarItem
            icon={<HomeIcon style={{ stroke: 'white' }} />}
            title={t('dashboard')}
            href={APP_ROUTES.cms.dashboard}
          />
          <SideBarItem
            icon={<UsersIcon style={{ stroke: 'white' }} />}
            title={t('users')}
            href={APP_ROUTES.cms.users.list}
          />
          <SideBarItem
            icon={<UserCheckIcon style={{ stroke: 'white' }} />}
            title={t('subscribers')}
            href={APP_ROUTES.cms.subscriptions.list}
          />
          <SideBarItem
            icon={<TaskIcon style={{ fill: 'white' }} />}
            title={t('ordered')}
            href={APP_ROUTES.cms.ordered.list}
          />
          <SideBarItem
            icon={<PackageIcon style={{ stroke: 'white' }} />}
            title={t('products')}
            href={APP_ROUTES.cms.products.list}
          />
          <SideBarItem
            icon={<TemplateIcon style={{ stroke: 'white', fill: 'none' }} />}
            title={t('template')}
            href={APP_ROUTES.cms.templates.list}
          />
        </Stack>
      </Stack>

      <Stack spacing={0}>
        <Popover
          isOpen={isOpenLanguage}
          onClose={() => setIsOpenLanguage(false)}
        >
          <PopoverTrigger>
            <Stack
              spacing={3}
              direction='row'
              alignItems='center'
              p='8px 12px'
              cursor='pointer'
              onClick={() => setIsOpenLanguage(true)}
            >
              <Button variant='unstyled' padding='4px' w='40px' h='40px'>
                <LanguageIcon
                  style={{
                    stroke: 'white',
                    strokeWidth: 1.75,
                  }}
                />
              </Button>

              <Text fontWeight='semibold' minW='180px' color='white'>
                {lang == 'vi' ? 'Tiếng Việt' : 'English'}
              </Text>
            </Stack>
          </PopoverTrigger>
          <PopoverContent w='120px'>
            <Button
              variant='unstyled'
              onClick={() => handleChangeLanguage('en')}
            >
              <Text color='black'>English</Text>
            </Button>
            <Button
              variant='unstyled'
              onClick={() => handleChangeLanguage('vi')}
            >
              <Text color='black'>Tiếng Việt</Text>
            </Button>
          </PopoverContent>
        </Popover>
        <Stack
          spacing={3}
          direction='row'
          alignItems='center'
          p='8px 12px'
          cursor='pointer'
          onClick={() => router.push(APP_ROUTES.home)}
        >
          <Button variant='unstyled' padding='4px' w='40px' h='40px'>
            <LogoutIcon style={{ stroke: 'white' }} />
          </Button>

          <Text minW='140px' fontWeight='semibold' color='white'>
            {t('back_to_home')}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CmsSideBar;
