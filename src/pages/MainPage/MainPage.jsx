import React from 'react';

import { StyleSheet } from 'react-native';
import { Box, ScrollView } from 'native-base';

import Header from '../../components/MainPageComponents/Header';
import CategoriesCarousel from '../../components/MainPageComponents/CategoriesCarousel';
import NewsSlider from '../../components/MainPageComponents/NewsSlider';
import BlockHeader from '../../components/MainPageComponents/BlockHeader';
import PromoItem from '../../components/PromosComponents/PromoItem';

const MainPage = () => {
  return (
    <Box safeAreaTop>
      <ScrollView>
        <Box style={styles.p20}>
          <Header />
        </Box>
        <Box style={{ paddingLeft: 20 }}>
          <CategoriesCarousel />
        </Box>
        <NewsSlider />
        <Box>
          <BlockHeader label={'Акции'} />
          <PromoItem />
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  p20: {
    padding: 20,
  },
});

export default MainPage;
