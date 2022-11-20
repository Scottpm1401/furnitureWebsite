import { Flex } from '@chakra-ui/layout';
import {
  Button,
  Grid,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import Link from 'next/link';
import setLanguage from 'next-translate/setLanguage';
import React, { useState } from 'react';

import LanguageIcon from '../../public/svg/language.svg';
import Logo from '../../public/svg/logo.svg';
import Container from '../Container';
import NavLink from './NavLink';

type Props = {};

const Nav = (props: Props) => {
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  const handleChangeLanguage = async (lang: string) => {
    await setLanguage(lang);
    setIsOpenLanguage(false);
  };

  return (
    <Container paddingY='4px'>
      <Grid
        templateColumns='1fr auto 1fr'
        h='60px'
        w='full'
        justifyContent='center'
      >
        <Flex h='full'>
          <Link style={{ height: 60 }} href='/'>
            <Logo />
          </Link>
        </Flex>
        <Flex alignItems='center'>
          <NavLink title='Home' href='/' />
          <NavLink title='About' href='/about' />
          <NavLink title='Products' href='/products' />
        </Flex>
        <Flex justifyContent='flex-end' alignItems='center'>
          <Popover
            isOpen={isOpenLanguage}
            onClose={() => setIsOpenLanguage(false)}
          >
            <PopoverTrigger>
              <Button
                display='flex'
                w='24px'
                h='24px'
                variant='unstyled'
                onClick={() => setIsOpenLanguage(true)}
              >
                <LanguageIcon />
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
        </Flex>
      </Grid>
    </Container>
  );
};

export default Nav;
