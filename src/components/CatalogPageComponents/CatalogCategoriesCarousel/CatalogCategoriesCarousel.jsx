import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, ScrollView, Text, Image } from 'native-base';

import propStyles from '../../../resources/propStyles';

import { getProductsList } from '../../../store/actions/product';

const CatalogCategoriesCarousel = ({
  categoriesList,
  getProductsList,
  currentProductCategory,
  orderSortProducts,
}) => {
  const navigation = useNavigation();

  const setCategory = (id, name) => {
    navigation.setOptions({ headerTitle: name });
    getProductsList(id, orderSortProducts);
  };

  return (
    <Box my={4}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoriesList?.length
          ? categoriesList.map((el, i) => (
              <TouchableOpacity
                onPress={() => setCategory(el.id, el.name)}
                key={i}
                style={{
                  ...styles.categoryItem,
                  backgroundColor:
                    currentProductCategory === el.id
                      ? propStyles.mainRedColor
                      : '#fff',
                  marginLeft: i === 0 ? 20 : 12,
                }}
              >
                <Box mr={4}>
                  <Image
                    borderRadius={50}
                    source={{ uri: el.image }}
                    w={30}
                    h={30}
                    alt={el.name}
                  />
                </Box>
                <Box>
                  <Text
                    style={{
                      color:
                        currentProductCategory === el.id
                          ? '#fff'
                          : propStyles.mainRedColor,
                    }}
                  >
                    {el.name}
                  </Text>
                </Box>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 14,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: '#fff',
    fontWeight: '500',
  },
});

const mapStateToProps = ({
  categories: { categoriesList, currentProductCategory },
  products: { orderSortProducts },
}) => ({
  categoriesList,
  currentProductCategory,
  orderSortProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getProductsList: (id, order) => dispatch(getProductsList(id, order)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogCategoriesCarousel);
