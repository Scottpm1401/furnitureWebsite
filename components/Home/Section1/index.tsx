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
            banner={`${process.env.NEXT_PUBLIC_CDN}/v1671091687/furniture/banners/slider_img_1_lt3wft.jpg`}
            title={t('better_interiors')}
            description={t('slide_1_des')}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            banner={`${process.env.NEXT_PUBLIC_CDN}/v1671091692/furniture/banners/slider_img_2_mfdllq.jpg`}
            title={t('beauty_indoors')}
            description={t('slide_2_des')}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            banner={`${process.env.NEXT_PUBLIC_CDN}/v1671091718/furniture/banners/slider_img_3_d716iv.jpg`}
            title={t('superior_living')}
            description={t('slide_3_des')}
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};

export default Section1;
