import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Flex, Text } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';
import BasketBottomLink from '../BasketBottomLink';

const AddToBasketFooter = ({ price, actionFn }) => {
  return (
    <Flex
      direction='row'
      justify='space-around'
      alignItems='center'
      height={78}
      position='absolute'
      bottom={0}
      right={0}
      left={0}
      bgColor={'#fff'}
      borderTopWidth={1}
      borderTopColor={propStyles.shadowedColor}
    >
      <Box>
        <Text fontSize={20}>{price?.toFixed(2)} p.</Text>
      </Box>
      <TouchableOpacity onPress={actionFn} style={styles.basketBtn}>
        <Box>
          <SimpleLineIcons name='basket' size={24} color={'#fff'} />
        </Box>
        <Box _text={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
          В корзину
        </Box>
      </TouchableOpacity>
      <BasketBottomLink bottom={74} />
    </Flex>
  );
};

const styles = StyleSheet.create({
  basketBtn: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 140,
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 50,
  },
});

export default AddToBasketFooter;
