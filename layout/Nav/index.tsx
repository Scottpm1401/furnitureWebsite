import {
  Avatar,
  Button,
  Flex,
  Grid,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { APP_ROUTES } from '../../constant';
import { useResponsive } from '../../hooks/responsive';
import AccountIcon from '../../public/svg/account.svg';
import CompanyIcon from '../../public/svg/company.svg';
import LanguageIcon from '../../public/svg/language.svg';
import LogoutIcon from '../../public/svg/log-out.svg';
import Logo from '../../public/svg/logo.svg';
import PackageIcon from '../../public/svg/package.svg';
import ShoppingBagIcon from '../../public/svg/shopping_bag.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions, selectors } from '../../redux/reducer';
import { logout } from '../../services/auth';
import Container from '../Container';
import MobileNavSideBar from './MobileNavSideBar';
import NavLink from './NavLink';

type Props = {};
const OFFSET = 160;
const MOBILE_OFFSET = 80;
export const NAV_HEIGHT = '84px';

const Nav = (props: Props) => {
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const { t } = useTranslation();
  const [isTop, setIsTop] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isMobileOrTablet, isMobile } = useResponsive();
  const {
    isOpen: isPopoverOpen,
    onToggle: onPopoverToggle,
    onClose: onPopoverClose,
  } = useDisclosure();
  const user = useAppSelector(selectors.user.selectUser);
  const totalCartItem = useMemo(() => {
    let count = 0;
    user.cart.forEach((item) => (count += item.quantity));
    return count;
  }, [user]);
  const refreshToken = useAppSelector(selectors.auth.selectRefreshToken);
  const handleChangeLanguage = async (lang: string) => {
    moment.locale(lang);
    await setLanguage(lang);
    setIsOpenLanguage(false);
  };
  const isAdmin = useAppSelector(selectors.user.isAdmin);

  const scrollEvent = useCallback(() => {
    const body = document.body;
    if (body) {
      const rect = body.getBoundingClientRect();
      if (rect.top <= -(isMobile ? MOBILE_OFFSET : OFFSET)) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    }
  }, [isMobile]);

  const handleLogout = async () => {
    if (refreshToken) {
      const data = await logout({ refreshToken });
      if (data.success) {
        dispatch(actions.auth.reset());
        dispatch(actions.user.reset());
        await router.push(APP_ROUTES.home);
      }
    }

    onPopoverToggle();
  };

  useEffect(() => {
    if (router.pathname === APP_ROUTES.home) {
      setIsTop(true);
      if (document) {
        document.addEventListener('scroll', scrollEvent);
      }
    } else {
      setIsTop(false);
    }

    return () => {
      document.removeEventListener('scroll', scrollEvent);
    };
  }, [router.pathname, scrollEvent]);

  return (
    <Flex
      paddingY='0.75rem'
      position='fixed'
      w='full'
      top={0}
      left={0}
      zIndex={99}
      bg={isTop ? 'transparent' : 'white'}
      transition='all 200ms ease-in-out'
    >
      <Container>
        <Grid
          templateColumns={isMobileOrTablet ? '1fr 1fr 1fr' : '1fr auto 1fr'}
          h='full'
          w='full'
          justifyContent='center'
          alignItems='center'
        >
          {isMobileOrTablet && (
            <MobileNavSideBar
              isTop={isTop}
              totalCartItem={totalCartItem}
              handleChangeLanguage={handleChangeLanguage}
              handleLogout={handleLogout}
            />
          )}
          <Flex
            sx={{ svg: { fill: isTop ? 'white' : 'black' } }}
            h='full'
            justifyContent={isMobileOrTablet ? 'center' : 'flex-start'}
          >
            <Link style={{ height: 60 }} href='/'>
              <Logo id='mobile_logo' />
            </Link>
          </Flex>
          {!isMobileOrTablet ? (
            <>
              <Flex alignItems='center'>
                <NavLink
                  title={t('home')}
                  href={APP_ROUTES.home}
                  textProps={{ color: isTop ? 'white' : 'black' }}
                />
                <NavLink
                  title={t('about')}
                  href={APP_ROUTES.about}
                  textProps={{ color: isTop ? 'white' : 'black' }}
                />
                <NavLink
                  title={t('products')}
                  href={APP_ROUTES.products}
                  textProps={{ color: isTop ? 'white' : 'black' }}
                />
                <NavLink
                  title={t('contact')}
                  href={APP_ROUTES.contact}
                  textProps={{ color: isTop ? 'white' : 'black' }}
                />
              </Flex>
              <Flex justifyContent='flex-end' alignItems='center'>
                <Popover
                  isOpen={isOpenLanguage}
                  onClose={() => setIsOpenLanguage(false)}
                >
                  <PopoverTrigger>
                    <Button
                      display='flex'
                      w='30px'
                      h='30px'
                      variant='unstyled'
                      minWidth={0}
                      p='4px'
                      onClick={() => setIsOpenLanguage(true)}
                    >
                      <LanguageIcon
                        style={{
                          stroke: isTop ? 'white' : 'black',
                          strokeWidth: 1.75,
                        }}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent w='120px'>
                    <Button
                      variant='unstyled'
                      onClick={() => handleChangeLanguage('en')}
                    >
                      English
                    </Button>
                    <Button
                      variant='unstyled'
                      onClick={() => handleChangeLanguage('vi')}
                    >
                      Tiếng Việt
                    </Button>
                  </PopoverContent>
                </Popover>
                {user._id ? (
                  <>
                    <Link href={APP_ROUTES.cart}>
                      <Button
                        w='27px'
                        h='30px'
                        variant='unstyled'
                        minWidth={0}
                        p='4px'
                        ml='16px'
                        position='relative'
                      >
                        <ShoppingBagIcon
                          style={{
                            stroke: isTop ? 'white' : 'black',
                            strokeWidth: 1.75,
                          }}
                        />
                        <Text
                          position='absolute'
                          top='0px'
                          right='-5px'
                          fontSize='smaller'
                          color={isTop ? 'white' : 'black'}
                          fontWeight='normal'
                        >
                          {totalCartItem}
                        </Text>
                      </Button>
                    </Link>

                    <Popover isOpen={isPopoverOpen} onClose={onPopoverClose}>
                      <PopoverTrigger>
                        <Button
                          variant='unstyled'
                          h='auto'
                          onClick={onPopoverToggle}
                        >
                          <Avatar
                            ml='1rem'
                            name={user?.displayName}
                            src={`${process.env.NEXT_PUBLIC_CDN}${user?.info?.avatar}`}
                            size='sm'
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent maxW='220px'>
                        <Stack
                          p='0.5rem'
                          sx={{
                            svg: {
                              width: '24px',
                              height: '24px',
                            },
                          }}
                          spacing={4}
                        >
                          <Link href={APP_ROUTES.profile}>
                            <Stack
                              direction='row'
                              onClick={onPopoverToggle}
                              w='full'
                            >
                              <AccountIcon />
                              <Text fontWeight='medium'>
                                {t('your_profile')}
                              </Text>
                            </Stack>
                          </Link>
                          <Link href={APP_ROUTES.ordered}>
                            <Stack
                              direction='row'
                              onClick={onPopoverToggle}
                              w='full'
                            >
                              <PackageIcon />
                              <Text fontWeight='medium'>
                                {t('your_ordered')}
                              </Text>
                            </Stack>
                          </Link>
                          {isAdmin && (
                            <Link href={APP_ROUTES.cms.dashboard}>
                              <Stack
                                direction='row'
                                onClick={onPopoverToggle}
                                w='full'
                              >
                                <CompanyIcon />
                                <Text fontWeight='medium'>CMS</Text>
                              </Stack>
                            </Link>
                          )}

                          <Stack
                            cursor='pointer'
                            direction='row'
                            onClick={() => handleLogout()}
                          >
                            <LogoutIcon />
                            <Text fontWeight='medium'>{t('logout')}</Text>
                          </Stack>
                        </Stack>
                      </PopoverContent>
                    </Popover>
                  </>
                ) : (
                  <>
                    <Link href={APP_ROUTES.login}>
                      <Button
                        variant='ghost'
                        ml='1rem'
                        colorScheme={isTop ? 'whiteAlpha' : 'blackAlpha'}
                      >
                        <Text color={isTop ? 'white' : 'black'}>
                          {t('sign_in')}
                        </Text>
                      </Button>
                    </Link>
                    <Link href={APP_ROUTES.signup}>
                      <Button
                        variant='outline'
                        ml='0.5rem'
                        colorScheme={isTop ? 'whiteAlpha' : 'blackAlpha'}
                      >
                        <Text color={isTop ? 'white' : 'black'}>
                          {t('sign_up')}
                        </Text>
                      </Button>
                    </Link>
                  </>
                )}
              </Flex>
            </>
          ) : (
            <Flex justifyContent='flex-end'>
              <Link href={APP_ROUTES.profile}>
                <Flex w='36px' h='36px'>
                  <Avatar
                    w='full'
                    h='full'
                    src={`${process.env.NEXT_PUBLIC_CDN}${user.info?.avatar}`}
                    name={user?.displayName}
                  />
                </Flex>
              </Link>
            </Flex>
          )}
        </Grid>
      </Container>
    </Flex>
  );
};

export default Nav;
