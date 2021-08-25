import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Flex, Box, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

const BasketCountBtns = ({ count, productId, setCount }) => {
  const onChangeCount = (plus) => {
    if (plus) {
      setCount(count + 1, productId);
    } else if (count >= 2) {
      setCount(count - 1, productId);
    }
  };

  return (
    <Flex
      width={60}
      height={30}
      bg='#f1f1f1'
      direction='row'
      alignItems='center'
      justify='center'
      position='relative'
    >
      <TouchableOpacity
        onPress={() => onChangeCount(false)}
        activeOpacity={0.5}
        style={[styles.countBtn, { left: -15 }]}
      >
        <Text fontSize={24}>-</Text>
      </TouchableOpacity>
      <Box zIndex={2}>
        <Text fontWeight='500'>{count}</Text>
      </Box>
      <TouchableOpacity
        onPress={() => onChangeCount(true)}
        activeOpacity={0.5}
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
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#fff',
    ...propStyles.shadowDefault,
  },
});

export default BasketCountBtns;
