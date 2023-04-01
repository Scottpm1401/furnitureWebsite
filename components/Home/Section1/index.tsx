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

import { useResponsive } from '../../../hooks/responsive';
import { useAppSelector } from '../../../redux/hooks';
import { selectors } from '../../../redux/reducer';
import Slide from './Slide';

type Props = {};

const Section1 = (props: Props) => {
  const { t, lang } = useTranslation();
  const { isMobile } = useResponsive();
  const banners = useAppSelector(selectors.global.selectBanners);

  return (
    <Flex id='section1'>
      <Swiper
        style={{ width: '100vw', height: isMobile ? '50vh' : '100vh' }}
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
        navigation={!isMobile}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className='mySwiper'
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <Slide
              banner={`${process.env.NEXT_PUBLIC_CDN}${banner.image}`}
              title={
                banner.title.find((item) => item.lang === lang)?.content || ''
              }
              description={
                banner.description.find((item) => item.lang === lang)
                  ?.content || ''
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

export default Section1;
