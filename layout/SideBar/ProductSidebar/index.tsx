import {
  Box,
  Button,
  Flex,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import ColorButton from '../../../components/ColorButton';
import { useResponsive } from '../../../hooks/responsive';
import {
  Filter,
  ProductBrand,
  ProductCategory,
  ProductColor,
} from '../../../models/product';
import { NAV_HEIGHT } from '../../Nav';

type SidebarType = {
  filter: Filter;
  handleUpdateFilter: (newFilter: Filter) => Promise<void>;
};

const ProductSidebar = ({ filter, handleUpdateFilter }: SidebarType) => {
  const [sliderValue, setSliderValue] = useState(1000);
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const filterByTitle = debounce(
    (value: string) =>
      handleUpdateFilter({ ...filter, offset: 0, title: value }),
    300
  );
  const filterByPrice = debounce(
    (value: number) =>
      handleUpdateFilter({ ...filter, offset: 0, price: value }),
    1000
  );
  return (
    <Box
      position={isMobile ? 'sticky' : 'relative'}
      zIndex={2}
      top={isMobile ? NAV_HEIGHT : 0}
      h='full'
      background='white'
    >
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
        {isMobile &&
          (!isShowFilter ? (
            <Button
              mt='1rem'
              colorScheme='orange'
              onClick={() => setIsShowFilter(!isShowFilter)}
            >
              <Text>{t('more_filter')}</Text>
            </Button>
          ) : (
            <Flex justifyContent='space-between'>
              <Button
                mt='0.5rem'
                colorScheme='orange'
                onClick={() => setIsShowFilter(!isShowFilter)}
              >
                <Text>{t('more_filter')}</Text>
              </Button>
              <Button
                mt='0.5rem'
                colorScheme='blackAlpha'
                onClick={() => setIsShowFilter(!isShowFilter)}
              >
                <Text>{t('done')}</Text>
              </Button>
            </Flex>
          ))}
        <Flex
          h={isMobile ? (isShowFilter ? '700px' : '0') : 'initial'}
          transition='all 300ms ease-in-out'
          mt='1rem'
          direction='column'
          w='full'
          overflow='auto'
          textAlign={isMobile ? 'center' : 'initial'}
        >
          <Flex direction='column' w='full'>
            <Text mt='0.5rem' fontSize='1.5rem' fontWeight='medium'>
              {t('categories')}
            </Text>
            {Object.values(ProductCategory).map((value, index) => (
              <Flex
                mt='0.5rem'
                justifyContent={isMobile ? 'center' : 'flex-start'}
                key={value}
              >
                <Flex
                  _hover={{
                    '.underline': {
                      width: '100%',
                    },
                  }}
                  cursor='pointer'
                  direction='column'
                  onClick={() =>
                    value === filter.category
                      ? handleUpdateFilter({
                          ...filter,
                          offset: 0,
                          category: undefined,
                        })
                      : handleUpdateFilter({
                          ...filter,
                          offset: 0,
                          category: value,
                        })
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
              <Flex
                mt='0.5rem'
                justifyContent={isMobile ? 'center' : 'flex-start'}
                key={value}
              >
                <Flex
                  _hover={{
                    '.underline': {
                      width: '100%',
                    },
                  }}
                  cursor='pointer'
                  onClick={() =>
                    value === filter.brand
                      ? handleUpdateFilter({
                          ...filter,
                          offset: 0,
                          brand: undefined,
                        })
                      : handleUpdateFilter({
                          ...filter,
                          offset: 0,
                          brand: value,
                        })
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
            <Flex justifyContent={isMobile ? 'center' : 'flex-start'}>
              {Object.values(ProductColor).map((color) => (
                <ColorButton
                  key={color}
                  product_color={color}
                  mr='0.5rem'
                  active={filter.color === color}
                  onClick={() =>
                    filter.color === color
                      ? handleUpdateFilter({
                          ...filter,
                          offset: 0,
                          color: undefined,
                        })
                      : handleUpdateFilter({ ...filter, offset: 0, color })
                  }
                />
              ))}
            </Flex>
          </Flex>
          <Flex
            direction='column'
            alignItems={isMobile ? 'center' : 'flex-start'}
          >
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

export default ProductSidebar;
