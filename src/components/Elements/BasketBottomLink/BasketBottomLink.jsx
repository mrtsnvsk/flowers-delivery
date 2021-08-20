import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';

const BasketBottomLink = ({ bottom }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BasketPage')}
      style={[styles.wrapper, { bottom }]}
    >
      <Fontisto name='shopping-basket-add' size={19} color={'#fff'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    width: 70,
    height: 50,
    backgroundColor: propStyles.mainRedColor,
    borderTopLeftRadius: 20,
  },
});

export default BasketBottomLink;
