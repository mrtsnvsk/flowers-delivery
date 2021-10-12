import React from 'react';

import { Box, ScrollView } from 'native-base';

import Header from '../../components/MainPageComponents/Header';
import CategoriesCarousel from '../../components/MainPageComponents/CategoriesCarousel';
import NewsSlider from '../../components/MainPageComponents/NewsSlider';
import BlockHeader from '../../components/MainPageComponents/BlockHeader';
import PromoItem from '../../components/PromosComponents/PromoItem';

const MainPage = () => {
  return (
    <Box flex={1} safeAreaTop>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p='20px' pb={0}>
          <Header />
        </Box>
        <Box pl='20px'>
          <CategoriesCarousel />
        </Box>
        <NewsSlider />
        <Box>
          <PromoItem />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default MainPage;
