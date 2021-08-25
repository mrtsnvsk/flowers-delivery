import React, { useState } from 'react';

import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Center, Image } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const img =
  'https://dicentra.ua/assets/images/sales/flower-weeks-18/729-346%D1%80%D1%83%D1%81%20(1).jpg';

const NewsSlider = () => {
  const [idx, setIdx] = useState(0);

  const carouselItems = [
    <TouchableOpacity activeOpacity={0.8}>
      <Image source={{ uri: img }} style={styles.imgBg} alt='News' />
    </TouchableOpacity>,
    <TouchableOpacity activeOpacity={0.8}>
      <Image source={{ uri: img }} style={styles.imgBg} alt='News' />
    </TouchableOpacity>,
    <TouchableOpacity activeOpacity={0.8}>
      <Image source={{ uri: img }} style={styles.imgBg} alt='News' />
    </TouchableOpacity>,
  ];

  const pagination = (
    <Pagination
      dotsLength={carouselItems.length}
      activeDotIndex={idx}
      containerStyle={styles.paginationContainer}
      dotContainerStyle={{ marginHorizontal: 4 }}
      dotStyle={styles.activeDot}
      inactiveDotStyle={styles.inactiveDot}
      inactiveDotOpacity={0.2}
      inactiveDotScale={1}
    />
  );

  return (
    <Center mt={'30px'}>
      <Carousel
        onSnapToItem={(index) => setIdx(index)}
        layout='default'
        data={carouselItems}
        sliderWidth={width - 40}
        itemWidth={width - 40}
        renderItem={({ item }) => item}
      />
      {pagination}
    </Center>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: width - 40,
    height: 160,
    borderRadius: 8,
  },
  imgBg: {
    width: '100%',
    height: 160,

    borderRadius: 8,
    resizeMode: 'stretch',
  },
  paginationContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: -16,
  },
  activeDot: {
    width: 34,
    height: 3,
    backgroundColor: '#000',
  },
  inactiveDot: {
    width: 34,
    height: 3,
    backgroundColor: '#000',
  },
});

export default NewsSlider;
