import {
  Button,
  Flex,
  Grid,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect, useState } from 'react';

import { API } from '../../api';
import axiosClient from '../../interceptor';
import AccountIcon from '../../public/svg/account.svg';
import LanguageIcon from '../../public/svg/language.svg';
import Logo from '../../public/svg/logo.svg';
import ShoppingBagIcon from '../../public/svg/shopping_bag.svg';
import { useAppDispatch } from '../../redux/hooks';
import { actions } from '../../redux/reducer';
import Container from '../Container';
import NavLink from './NavLink';

type Props = {};
const OFFSET = 160;

const Nav = (props: Props) => {
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const { t } = useTranslation();
  const [isTop, setIsTop] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChangeLanguage = async (lang: string) => {
    await setLanguage(lang);
    setIsOpenLanguage(false);
  };

  const scrollEvent = useCallback(() => {
    const body = document.body;
    if (body) {
      const rect = body.getBoundingClientRect();
      if (rect.top <= -OFFSET) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    }
  }, []);

  const handleClick = async () => {
    const res = await axiosClient.post(API.USER.LOGIN, {
      email: 'scott@example.com',
      password: 'scott123',
    });
    dispatch(actions.auth.setAuth(res.data));
    console.log('test', res.data);
  };

  useEffect(() => {
    if (router.pathname === '/') {
      if (document) {
        document.addEventListener('scroll', scrollEvent);
      }
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
    >
      <Container>
        <Grid
          templateColumns='1fr auto 1fr'
          h='full'
          w='full'
          justifyContent='center'
        >
          <Flex h='full'>
            <Link style={{ height: 60 }} href='/'>
              <Logo style={{ fill: isTop ? 'white' : 'black' }} />
            </Link>
          </Flex>
          <Flex alignItems='center'>
            <NavLink
              title={t('home')}
              href='/'
              textColor={isTop ? 'white' : 'black'}
            />
            <NavLink
              title={t('about')}
              href='/about'
              textColor={isTop ? 'white' : 'black'}
            />
            <NavLink
              title={t('products')}
              href='/products'
              textColor={isTop ? 'white' : 'black'}
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
                  <LanguageIcon style={{ fill: isTop ? 'white' : 'black' }} />
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
            <Button
              w='27px'
              h='30px'
              variant='unstyled'
              minWidth={0}
              p='4px'
              ml='16px'
              position='relative'
            >
              <ShoppingBagIcon style={{ fill: isTop ? 'white' : 'black' }} />
              <Text
                position='absolute'
                top='0px'
                right='-5px'
                fontSize='smaller'
                color={isTop ? 'white' : 'black'}
              >
                0
              </Text>
            </Button>
            <Button
              w='30px'
              h='30px'
              variant='unstyled'
              minWidth={0}
              p='4px'
              ml='16px'
            >
              <AccountIcon style={{ fill: isTop ? 'white' : 'black' }} />
            </Button>
          </Flex>
        </Grid>
      </Container>
    </Flex>
  );
};

export default Nav;
