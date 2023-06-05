import {
  Avatar,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useRef, useState } from 'react';

import SocialIcon from '../../../components/SocialIcon';
import { APP_ROUTES } from '../../../constant';
import CloseIcon from '../../../public/svg/close.svg';
import ContactIcon from '../../../public/svg/contact.svg';
import Facebook from '../../../public/svg/facebook.svg';
import HomeIcon from '../../../public/svg/home.svg';
import InfoIcon from '../../../public/svg/info.svg';
import Instagram from '../../../public/svg/instagram.svg';
import LanguageIcon from '../../../public/svg/language.svg';
import LoginIcon from '../../../public/svg/log-in.svg';
import LogoutIcon from '../../../public/svg/log-out.svg';
import Logo from '../../../public/svg/logo.svg';
import MenuIcon from '../../../public/svg/menu.svg';
import PackageIcon from '../../../public/svg/package.svg';
import ShoppingBagIcon from '../../../public/svg/shopping_bag.svg';
import StoreIcon from '../../../public/svg/store.svg';
import Twitter from '../../../public/svg/twitter.svg';
import SignupIcon from '../../../public/svg/user-plus.svg';
import { useAppSelector } from '../../../redux/hooks';
import { selectors } from '../../../redux/reducer';
import NavLink from '../NavLink';

type MobileNavSideBarType = {
  isTop: boolean;
  totalCartItem: number;
  handleChangeLanguage: (lang: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};

const MobileNavSideBar = ({
  isTop,
  totalCartItem,
  handleChangeLanguage,
  handleLogout,
}: MobileNavSideBarType) => {
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const router = useRouter();
  const user = useAppSelector(selectors.user.selectUser);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, lang } = useTranslation();

  const handleUpdateLanguage = async (lang: string) => {
    await handleChangeLanguage(lang);
    setIsOpenLanguage(false);
  };

  return (
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
            <Stack
              direction='row'
              paddingY='1rem'
              w='full'
              justifyContent='space-between'
            >
              {user._id ? (
                <Link href={APP_ROUTES.profile} onClick={onClose}>
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
                      <Text>{user.email}</Text>
                    </Flex>
                  </Flex>
                </Link>
              ) : (
                <Link href={APP_ROUTES.home} onClick={onClose}>
                  <Flex height='48px' sx={{ svg: { fill: 'white' } }}>
                    <Logo id='sidebar_logo' />
                  </Flex>
                </Link>
              )}

              <Button
                p='10px'
                variant='unstyled'
                w='40px'
                h='40px'
                onClick={onClose}
              >
                <CloseIcon style={{ stroke: 'black' }} />
              </Button>
            </Stack>
            <Flex
              mt='1.5rem'
              direction='column'
              justifyContent='flex-start'
              h='full'
            >
              <NavLink
                title={t('home')}
                href={APP_ROUTES.home}
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
                href={APP_ROUTES.about}
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
                href={APP_ROUTES.products}
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
                    href={APP_ROUTES.cart}
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
                  <NavLink
                    title={t('your_ordered')}
                    href={APP_ROUTES.ordered}
                    textProps={{
                      color: 'black',
                      fontSize: 'xl',
                      fontWeight: 'semibold',
                    }}
                    direction='left'
                    icon={
                      <PackageIcon
                        style={{ width: 24, height: 24, stroke: 'black' }}
                      />
                    }
                    mt='0.5rem'
                    onClick={onClose}
                  />
                </>
              )}
              <NavLink
                title={t('contact')}
                href={APP_ROUTES.contact}
                textProps={{
                  color: 'black',
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                }}
                direction='left'
                icon={<ContactIcon style={{ width: 24, height: 24 }} />}
                mt='0.5rem'
                onClick={onClose}
              />
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

                    <Text
                      ml='1rem'
                      fontSize='xl'
                      fontWeight='semibold'
                      color='black'
                    >
                      {lang == 'vi' ? 'Tiếng Việt' : 'English'}
                    </Text>
                  </Button>
                </PopoverTrigger>
                <PopoverContent w='120px'>
                  <Button
                    variant='unstyled'
                    onClick={() => handleUpdateLanguage('en')}
                  >
                    <Text color='black'>English</Text>
                  </Button>
                  <Button
                    variant='unstyled'
                    onClick={() => handleUpdateLanguage('vi')}
                  >
                    <Text color='black'>Tiếng Việt</Text>
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
                    href={APP_ROUTES.login}
                    textProps={{
                      color: 'black',
                      fontSize: 'xl',
                      fontWeight: 'semibold',
                    }}
                    direction='left'
                    icon={
                      <LoginIcon
                        style={{
                          width: 24,
                          height: 24,
                          stroke: 'black',
                        }}
                      />
                    }
                    onClick={onClose}
                  />
                  <NavLink
                    title={t('sign_up')}
                    href={APP_ROUTES.signup}
                    textProps={{
                      color: 'black',
                      fontSize: 'xl',
                      fontWeight: 'semibold',
                    }}
                    direction='left'
                    icon={
                      <SignupIcon
                        style={{
                          width: 24,
                          height: 24,
                          stroke: 'black',
                        }}
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
                          <stop stopColor='#fdf497' offset='0' />
                          <stop stopColor='#fdf497' offset='0.05' />
                          <stop stopColor='#fd5949' offset='0.45' />
                          <stop stopColor='#d6249f' offset='0.6' />
                          <stop stopColor='#285AEB' offset='0.9' />
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

export default MobileNavSideBar;
