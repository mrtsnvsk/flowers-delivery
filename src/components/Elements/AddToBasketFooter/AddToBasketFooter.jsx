import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Flex, Text } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';

import BasketBottomLink from '../BasketBottomLink';
import i18n from 'i18n-js';

const AddToBasketFooter = ({
  price,
  actionFn,
  actionDeleteFn,
  matchItem,
  oldPrice,
}) => {
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
      <Flex justify='center'>
        {oldPrice && (
          <Text
            color={propStyles.orangeColor}
            textDecorationColor={propStyles.orangeColor}
            textDecoration='line-through'
            textDecorationLine='line-through'
            fontSize={14}
          >
            {oldPrice} p.
          </Text>
        )}
        <Text fontSize={20}>{price} p.</Text>
      </Flex>
      {!matchItem ? (
        <TouchableOpacity onPress={actionFn} style={styles.basketBtn}>
          <Box mr={3}>
            <SimpleLineIcons name='basket' size={24} color={'#fff'} />
          </Box>
          <Box _text={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
            {i18n.t('addToBasketBtn')}
          </Box>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={actionDeleteFn}
          style={[
            styles.basketBtn,
            { backgroundColor: propStyles.mainRedColor },
          ]}
        >
          <Box mr={3}>
            <SimpleLineIcons name='basket' size={24} color={'#fff'} />
          </Box>
          <Box _text={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
            {i18n.t('deleteFromBasketBtn')}
          </Box>
        </TouchableOpacity>
      )}

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
    paddingHorizontal: 16,
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
});

export default AddToBasketFooter;
