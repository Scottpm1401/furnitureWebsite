import {
  Avatar,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useResponsive } from '../../hooks/useResponsive';
import CloseIcon from '../../public/svg/close.svg';
import Facebook from '../../public/svg/facebook.svg';
import HomeIcon from '../../public/svg/home.svg';
import InfoIcon from '../../public/svg/info.svg';
import Instagram from '../../public/svg/instagram.svg';
import LanguageIcon from '../../public/svg/language.svg';
import LoginIcon from '../../public/svg/log-in.svg';
import LogoutIcon from '../../public/svg/log-out.svg';
import Logo from '../../public/svg/logo.svg';
import MenuIcon from '../../public/svg/menu.svg';
import ShoppingBagIcon from '../../public/svg/shopping_bag.svg';
import StoreIcon from '../../public/svg/store.svg';
import Twitter from '../../public/svg/twitter.svg';
import SignupIcon from '../../public/svg/user-plus.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { actions, selectors } from '../../redux/reducer';
import { logout } from '../../services/auth';
import Container from '../Container';
import SocialIcon from '../SocialIcon';
import NavLink from './NavLink';

type Props = {};
const OFFSET = 160;
const MOBILE_OFFSET = 80;
export const NAV_HEIGHT = '84px';

const Nav = (props: Props) => {
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const { t, lang } = useTranslation();
  const [isTop, setIsTop] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    await setLanguage(lang);
    setIsOpenLanguage(false);
  };
  const btnRef = useRef<HTMLButtonElement | null>(null);

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
        await router.push('/');
        dispatch(actions.auth.reset());
        dispatch(actions.user.reset());
      }
    }

    onPopoverToggle();
  };

  useEffect(() => {
    if (router.pathname === '/') {
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
            <Flex justifyContent='flex-start' alignItems='center'>
              <Button
                variant='unstyled'
                w='24px'
                h='24px'
                ref={btnRef}
                onClick={onOpen}
              >
                <MenuIcon style={{ stroke: isTop ? 'white' : 'black' }} />
              </Button>
            </Flex>
          )}
          <Flex h='full'>
            <Link style={{ height: 60 }} href='/'>
              <Logo style={{ fill: isTop ? 'white' : 'black' }} />
            </Link>
          </Flex>
          {!isMobileOrTablet ? (
            <>
              <Flex alignItems='center'>
                <NavLink
                  title={t('home')}
                  href='/'
                  textProps={{ color: isTop ? 'white' : 'black' }}
                />
                <NavLink
                  title={t('about')}
                  href='/about'
                  textProps={{ color: isTop ? 'white' : 'black' }}
                />
                <NavLink
                  title={t('products')}
                  href='/products'
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
                    <Link href='/cart'>
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
                            src={`${process.env.NEXT_PUBLIC_CDN}/${user?.info?.avatar}`}
                            size='sm'
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent maxW='120px'>
                        <Flex direction='column'>
                          <Link href='/profile'>
                            <Button
                              w='full'
                              variant='unstyled'
                              onClick={onPopoverToggle}
                            >
                              {t('your_profile')}
                            </Button>
                          </Link>
                          <Button
                            variant='unstyled'
                            onClick={() => handleLogout()}
                          >
                            {t('logout')}
                          </Button>
                        </Flex>
                      </PopoverContent>
                    </Popover>
                  </>
                ) : (
                  <>
                    <Link href='/login'>
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
                    <Link href='/signup'>
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
            <Link href='/profile'>
              <Flex justifyContent='flex-end'>
                <Flex w='36px' h='36px'>
                  <Avatar
                    w='full'
                    h='full'
                    src={`${process.env.NEXT_PUBLIC_CDN}/${user.info?.avatar}`}
                    name={user?.displayName}
                  />
                </Flex>
              </Flex>
            </Link>
          )}
        </Grid>
      </Container>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg='orange.200'>
          <Flex
            marginX='1.5rem'
            h='full'
            direction='column'
            justifyContent='space-between'
          >
            <Flex paddingY='1rem' w='full' justifyContent='space-between'>
              {user._id ? (
                <Link href='/profile' onClick={onClose}>
                  <Flex alignItems='center'>
                    <Flex mr='0.5rem' w='48px' h='48px'>
                      <Avatar
                        w='full'
                        h='full'
                        src={`${process.env.NEXT_PUBLIC_CDN}/${user.info?.avatar}`}
                        name={user?.displayName}
                      />
                    </Flex>
                    <Flex direction='column'>
                      <Text fontWeight='semibold' fontSize='xl'>
                        {user.displayName}
                      </Text>
                      <Text>{user.email}</Text>
                    </Flex>
                  </Flex>
                </Link>
              ) : (
                <Link style={{ height: 48 }} href='/' onClick={onClose}>
                  <Logo style={{ fill: 'white' }} />
                </Link>
              )}

              <Button p='10px' variant='unstyled' onClick={onClose}>
                <CloseIcon style={{ stroke: 'black' }} />
              </Button>
            </Flex>
            <Flex
              mt='1.5rem'
              direction='column'
              justifyContent='flex-start'
              h='full'
            >
              <NavLink
                title={t('home')}
                href='/'
                textProps={{
                  color: 'black',
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                }}
                direction='left'
                icon={
                  <HomeIcon
                    style={{ width: 24, height: 24, stroke: 'black' }}
                  />
                }
                onClick={onClose}
              />
              <NavLink
                title={t('about')}
                href='/about'
                textProps={{
                  color: 'black',
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                }}
                direction='left'
                icon={
                  <InfoIcon
                    style={{ width: 24, height: 24, stroke: 'black' }}
                  />
                }
                mt='0.5rem'
                onClick={onClose}
              />

              <NavLink
                title={t('products')}
                href='/products'
                textProps={{
                  color: 'black',
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                }}
                direction='left'
                icon={
                  <StoreIcon style={{ width: 24, height: 24, fill: 'black' }} />
                }
                mt='0.5rem'
                onClick={onClose}
              />
              {user._id && (
                <>
                  <NavLink
                    title={t('cart')}
                    href='/cart'
                    textProps={{
                      color: 'black',
                      fontSize: 'xl',
                      fontWeight: 'semibold',
                    }}
                    direction='left'
                    icon={
                      <Flex w='24px' h='24px' minWidth={0} position='relative'>
                        <ShoppingBagIcon
                          style={{
                            stroke: 'black',
                            strokeWidth: 1.75,
                          }}
                        />
                        <Text
                          position='absolute'
                          top='-8px'
                          right='-8px'
                          fontSize='smaller'
                          color='black'
                          fontWeight='normal'
                        >
                          {totalCartItem}
                        </Text>
                      </Flex>
                    }
                    mt='0.5rem'
                    onClick={onClose}
                  />
                </>
              )}
            </Flex>
            <Stack mb='2.5rem' spacing='0.5rem'>
              <Popover
                isOpen={isOpenLanguage}
                onClose={() => setIsOpenLanguage(false)}
              >
                <PopoverTrigger>
                  <Button
                    display='flex'
                    variant='unstyled'
                    minWidth={0}
                    onClick={() => setIsOpenLanguage(true)}
                    justifyContent='flex-start'
                  >
                    <Flex w='24px' h='24px'>
                      <LanguageIcon
                        style={{
                          stroke: 'black',
                          strokeWidth: 1.75,
                        }}
                      />
                    </Flex>

                    <Text ml='1rem' fontSize='lg' fontWeight='semibold'>
                      {lang == 'vi' ? 'Tiếng Việt' : 'English'}
                    </Text>
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
                <NavLink
                  title={t('logout')}
                  href={router.pathname}
                  textProps={{
                    color: 'black',
                    fontSize: 'xl',
                    fontWeight: 'semibold',
                  }}
                  direction='left'
                  icon={
                    <LogoutIcon
                      style={{ width: 24, height: 24, stroke: 'black' }}
                    />
                  }
                  onClick={() => {
                    handleLogout();
                    onClose();
                  }}
                />
              ) : (
                <>
                  <NavLink
                    title={t('sign_in')}
                    href='/login'
                    textProps={{
                      color: 'black',
                      fontSize: 'xl',
                      fontWeight: 'semibold',
                    }}
                    direction='left'
                    icon={
                      <LoginIcon
                        style={{ width: 24, height: 24, stroke: 'black' }}
                      />
                    }
                    onClick={onClose}
                  />
                  <NavLink
                    title={t('sign_up')}
                    href='/signup'
                    textProps={{
                      color: 'black',
                      fontSize: 'xl',
                      fontWeight: 'semibold',
                    }}
                    direction='left'
                    icon={
                      <SignupIcon
                        style={{ width: 24, height: 24, stroke: 'black' }}
                      />
                    }
                    onClick={onClose}
                  />
                </>
              )}

              <Stack
                mt='2rem !important'
                direction='row'
                spacing='2rem'
                justifyContent='center'
              >
                <SocialIcon
                  href='https://www.facebook.com'
                  icon={<Facebook />}
                  hoverColor='rgb(56, 88, 152)'
                />

                <SocialIcon
                  href='https://www.instagram.com'
                  icon={
                    <>
                      <svg
                        className='instargram_linear'
                        style={{ width: 0, height: 0 }}
                      >
                        <radialGradient id='rg' r='150%' cx='30%' cy='107%'>
                          <stop stop-color='#fdf497' offset='0' />
                          <stop stop-color='#fdf497' offset='0.05' />
                          <stop stop-color='#fd5949' offset='0.45' />
                          <stop stop-color='#d6249f' offset='0.6' />
                          <stop stop-color='#285AEB' offset='0.9' />
                        </radialGradient>
                      </svg>
                      <Instagram />
                    </>
                  }
                  hoverColor='url(#rg)'
                  strokeColor='white'
                />
                <SocialIcon
                  href='https://twitter.com'
                  icon={<Twitter />}
                  hoverColor='rgb(29, 161, 242)'
                />
              </Stack>
            </Stack>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Nav;
