import { Flex, Stack, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { useResponsive } from '../../../hooks/responsive';
import Container from '../../../layout/Container';
import TeamCard from '../../TeamCard';

type Props = {};

const Section3 = (props: Props) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  return (
    <Flex w='full' direction='column'>
      <Flex
        justifyContent='center'
        alignItems='center'
        bg='orange.100'
        w='full'
        h='400px'
        direction='column'
      >
        <Text fontSize='sm' color='#464646' textTransform='uppercase'>
          {t('our-creative-force')}
        </Text>

        <Text textAlign='center' fontSize='4xl' fontWeight='bold'>
          {t('meet-our-team')}
        </Text>
        <Flex mt='0.5rem' h='1px' w='120px' background='black' />
      </Flex>
      <Container>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          w='full'
          transform='translateY(-100px)'
          spacing='3rem'
          alignItems='center'
        >
          <TeamCard
            name='Nicolette Ritonni'
            role={t('fine-ceramics')}
            img='/images/team/team-img-4.jpg'
          />
          <TeamCard
            name='Juliette Massé'
            role={t('store-manager')}
            img='/images/team/team-img-3.jpg'
          />
          <TeamCard
            name='Nicolas Waldau'
            role={t('architect')}
            img='/images/team/team-img-2.jpg'
          />
          <TeamCard
            name='Yeung Ngai'
            role={t('designer')}
            img='/images/team/team-img-1.jpg'
          />
        </Stack>
      </Container>
    </Flex>
  );
};

export default Section3;
