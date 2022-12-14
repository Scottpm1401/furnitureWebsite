import {
  Avatar,
  Button,
  Flex,
  Grid,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useResponsive } from '../../hooks/useResponsive';
import LanguageIcon from '../../public/svg/language.svg';
import Logo from '../../public/svg/logo.svg';
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
    await setLanguage(lang);
    setIsOpenLanguage(false);
  };

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
                      Ti???ng Vi???t
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
            <Flex justifyContent='flex-end'>
              <Link href='/profile'>
                <Flex w='36px' h='36px'>
                  <Avatar
                    w='full'
                    h='full'
                    src={`${process.env.NEXT_PUBLIC_CDN}/${user.info?.avatar}`}
                    name={user?.displayName}
                    // bg={user?.displayName ? '' : 'orange.300'}
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
