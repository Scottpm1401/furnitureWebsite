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
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import AccountIcon from '../../public/svg/account.svg';
import LanguageIcon from '../../public/svg/language.svg';
import Logo from '../../public/svg/logo.svg';
import ShoppingBagIcon from '../../public/svg/shopping_bag.svg';
import Container from '../Container';
import NavLink from './NavLink';

type Props = {};

const Nav = (props: Props) => {
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const { t } = useTranslation();

  const handleChangeLanguage = async (lang: string) => {
    await setLanguage(lang);
    setIsOpenLanguage(false);
  };

  return (
    <Container
      paddingY='4px'
      position='fixed'
      w='full'
      h='60px'
      top={0}
      left={0}
      zIndex={99}
    >
      <Grid
        templateColumns='1fr auto 1fr'
        h='full'
        w='full'
        justifyContent='center'
      >
        <Flex h='full'>
          <Link style={{ height: 60 }} href='/'>
            <Logo style={{ fill: 'white' }} />
          </Link>
        </Flex>
        <Flex alignItems='center'>
          <NavLink title={t('home')} href='/' />
          <NavLink title={t('about')} href='/about' />
          <NavLink title={t('products')} href='/products' />
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
                <LanguageIcon style={{ fill: 'white' }} />
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
            <ShoppingBagIcon style={{ fill: 'white' }} />
            <Text
              position='absolute'
              top='0px'
              right='-5px'
              fontSize='smaller'
              color='white'
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
            <AccountIcon style={{ fill: 'white' }} />
          </Button>
        </Flex>
      </Grid>
    </Container>
  );
};

export default Nav;
