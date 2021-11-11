import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Center, Image } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

import { getPromosList } from '../../../store/actions/promos';

const NewsSlider = ({ getPromosList, promosList }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    getPromosList();
  }, [getPromosList]);

  if (!promosList.length) return null;

  const pagination = (
    <Pagination
      dotsLength={promosList.length}
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
        data={promosList}
        sliderWidth={width - 40}
        itemWidth={width - 40}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={{ uri: item.image }}
                style={styles.imgBg}
                alt={item.name}
              />
            </TouchableOpacity>
          );
        }}
      />
      {pagination}
    </Center>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: width - 40,
    height: 160,
    borderRadius: 6,
  },
  imgBg: {
    width: '100%',
    height: 160,

    borderRadius: 6,
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

const mapStateToProps = ({ promos: { promosList } }) => ({ promosList });

const mapDispatchToProps = (dispatch) => ({
  getPromosList: () => dispatch(getPromosList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsSlider);
