import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Flex, Box, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

const BasketCountBtns = ({ count }) => {
  return (
    <Flex
      width={74}
      height={34}
      bg='#f1f1f1'
      direction='row'
      alignItems='center'
      justify='center'
      position='relative'
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.countBtn, { left: -15 }]}
      >
        <Text fontSize={24}>-</Text>
      </TouchableOpacity>
      <Box zIndex={2}>
        <Text fontWeight='500'>{count}</Text>
      </Box>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.countBtn, { right: -15 }]}
      >
        <Text fontSize={24}>+</Text>
      </TouchableOpacity>
    </Flex>
  );
};

const styles = StyleSheet.create({
  countBtn: {
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#fff',
    ...propStyles.shadowDefault,
  },
});

export default BasketCountBtns;
