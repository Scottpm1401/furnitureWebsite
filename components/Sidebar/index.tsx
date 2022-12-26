import {
  Box,
  Flex,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { debounce } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import {
  Filter,
  ProductBrand,
  ProductCategory,
  ProductColor,
} from '../../models/product';
import ColorButton from '../ColorButton';
import { NAV_HEIGHT } from '../Nav';

type SidebarType = {
  filter: Filter;
  handleUpdateFilter: (newFilter: Filter) => Promise<void>;
};

const Sidebar = ({ filter, handleUpdateFilter }: SidebarType) => {
  const [sliderValue, setSliderValue] = useState(1000);
  const { t } = useTranslation();
  const filterByTitle = debounce(
    (value: string) => handleUpdateFilter({ ...filter, title: value }),
    300
  );
  const filterByPrice = debounce(
    (value: number) => handleUpdateFilter({ ...filter, price: value }),
    1000
  );
  return (
    <Box position='relative' h='full'>
      <Flex
        direction='column'
        position='sticky'
        maxH={`calc(100vh - ${NAV_HEIGHT})`}
        pb='1rem'
        top={NAV_HEIGHT}
        left='0'
      >
        <Input
          placeholder={t('search_place_holder')}
          onChange={(e) => filterByTitle(e.target.value)}
        />
        <Flex mt='1rem' direction='column' w='full' overflow='auto'>
          <Flex direction='column' w='full'>
            <Text mt='0.5rem' fontSize='1.5rem' fontWeight='medium'>
              {t('categories')}
            </Text>
            {Object.values(ProductCategory).map((value, index) => (
              <Flex mt='0.5rem' key={value}>
                <Flex
                  css={css`
                    &:hover .underline {
                      width: 100%;
                    }
                  `}
                  cursor='pointer'
                  direction='column'
                  onClick={() =>
                    value === filter.category
                      ? handleUpdateFilter({ ...filter, category: undefined })
                      : handleUpdateFilter({ ...filter, category: value })
                  }
                >
                  <Text>{t(value)}</Text>
                  <Flex
                    className='underline'
                    w={filter.category === value ? 'full' : '0'}
                    h='1px'
                    bg='black'
                    transition='all 300ms ease-in-out'
                  />
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Flex direction='column'>
            <Text mt='0.5rem' fontSize='1.5rem' fontWeight='medium'>
              {t('brand')}
            </Text>
            {Object.values(ProductBrand).map((value, index) => (
              <Flex mt='0.5rem' key={value}>
                <Flex
                  css={css`
                    &:hover .underline {
                      width: 100%;
                    }
                  `}
                  cursor='pointer'
                  onClick={() =>
                    value === filter.brand
                      ? handleUpdateFilter({ ...filter, brand: undefined })
                      : handleUpdateFilter({ ...filter, brand: value })
                  }
                  direction='column'
                >
                  <Text>{t(value)}</Text>
                  <Flex
                    className='underline'
                    w={filter.brand === value ? 'full' : '0'}
                    h='1px'
                    bg='black'
                    transition='all 300ms ease-in-out'
                  />
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Flex direction='column'>
            <Text mt='0.5rem' fontSize='1.5rem' fontWeight='medium'>
              {t('colors')}
            </Text>
            <Flex>
              {Object.values(ProductColor).map((color) => (
                <ColorButton
                  key={color}
                  product_color={color}
                  mr='0.5rem'
                  active={filter.color === color}
                  onClick={() =>
                    filter.color === color
                      ? handleUpdateFilter({ ...filter, color: undefined })
                      : handleUpdateFilter({ ...filter, color })
                  }
                />
              ))}
            </Flex>
          </Flex>
          <Flex direction='column'>
            <Text mt='0.5rem' fontSize='1.5rem' fontWeight='medium'>
              {t('prices')}
            </Text>
            <Text mt='0.5rem' fontSize='1rem' fontWeight='medium'>
              ${sliderValue}
            </Text>
            <Slider
              value={sliderValue}
              onChange={(value) => setSliderValue(value)}
              onChangeEnd={(value) => filterByPrice(value)}
              min={25}
              max={1000}
              w='80%'
            >
              <SliderTrack bg='red.100'>
                <Box position='relative' right={10} />
                <SliderFilledTrack bg='tomato' />
              </SliderTrack>
              <SliderThumb boxSize={4} bg='tomato' />
            </Slider>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
