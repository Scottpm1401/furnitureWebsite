// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Slide from './Slide';

type Props = {};

const Section1 = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Flex id='section1'>
      <Swiper
        style={{ width: '100vw', height: '100vh' }}
        spaceBetween={30}
        effect={'fade'}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        navigation
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            banner='/images/slider/slider_img_1.jpg'
            title={t('better_interiors')}
            description='The perfect place for every contemporary furniture store and manufacturer.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            banner='/images/slider/slider_img_2.jpg'
            title={t('beauty_indoors')}
            description='The perfect place for every contemporary furniture store and manufacturer.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            banner='/images/slider/slider_img_3.jpg'
            title={t('superior_living')}
            description='The perfect place for every contemporary furniture store and manufacturer.'
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};

export default Section1;
