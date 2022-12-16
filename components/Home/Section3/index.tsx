import { Flex, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Container from '../../Container';
import TeamCard from '../../TeamCard';

type Props = {};

const Section3 = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Flex w='full' direction='column'>
      <Flex
        justifyContent='center'
        alignItems='center'
        bg='rgb(231, 225, 216)'
        w='full'
        h='400px'
        direction='column'
      >
        <Text fontSize='sm' color='#464646' textTransform='uppercase'>
          {t('our-creative-force')}
        </Text>

        <Text fontSize='4xl' fontWeight='bold'>
          {t('meet-our-team')}
        </Text>
        <Flex mt='0.5rem' h='1px' w='120px' background='black' />
      </Flex>
      <Container>
        <Flex w='full' transform='translateY(-100px)'>
          <TeamCard
            name='Nicolette Ritonni'
            role={t('fine-ceramics')}
            img='/images/team/team-img-4.jpg'
          />
          <TeamCard
            name='Juliette Massé'
            role={t('store-manager')}
            img='/images/team/team-img-3.jpg'
            ml='3rem'
          />
          <TeamCard
            name='Nicolas Waldau'
            role={t('architech')}
            img='/images/team/team-img-2.jpg'
            ml='3rem'
          />
          <TeamCard
            name='Yeung Ngai'
            role={t('designer')}
            img='/images/team/team-img-1.jpg'
            ml='3rem'
          />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Section3;
