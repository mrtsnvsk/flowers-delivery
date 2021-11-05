import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Box, Flex, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

import DottedUnderline from '../DottedUnderline';
import { onAlert } from '../../../resources/utils';
const { width } = Dimensions.get('window');
import i18n from 'i18n-js';

const OrderDetails = ({ order, hideOrderBtn }) => {
  const navigation = useNavigation();

  const [price, setPrice] = useState(0);
  const [additPrice, setAdditPrice] = useState(0);

  useEffect(() => {
    getOrderDetails();
  }, [order]);

  const getOrderDetails = () => {
    if (order.length) {
      setPrice(order.reduce((acc, val) => acc + val.price * val.count, 0));
      const additionalProductsPrice = order?.reduce(
        (acc, val) =>
          +acc + +val.additItems.reduce((acc2, val2) => acc2 + val2.price, 0),
        0
      );
      setAdditPrice(additionalProductsPrice);
    } else {
      setPrice(0);
      setAdditPrice(0);
    }
  };

  const createOrder = () => {
    price > 0
      ? navigation.navigate('OrderingPage')
      : onAlert(i18n.t('orderAlert'));
  };

  return (
    <Box
      borderRadius={6}
      mt='30px'
      bg={!hideOrderBtn ? propStyles.basketBlocksColor : '#fff'}
      p='14px'
    >
      <Box mb={3}>
        <Flex direction='row' justify='space-between' align='center'>
          <Box>{i18n.t('orderInfoProducts')}</Box>
          <Flex direction='row' align='center'>
            <Box mr={1}>
              <Text>x{order.length}</Text>
            </Box>
            <Box>
              <Text>{price} p.</Text>
            </Box>
          </Flex>
        </Flex>
        <DottedUnderline />
      </Box>
      <Box mb={3}>
        <Flex direction='row' justify='space-between' align='center'>
          <Box>{i18n.t('orderInfoAddit')}</Box>
          <Flex direction='row' align='center'>
            <Box mr={1}>
              <Text>
                x{order?.reduce((acc, val) => +acc + +val.additItems.length, 0)}
              </Text>
            </Box>
            <Box>
              <Text>{additPrice} p.</Text>
            </Box>
          </Flex>
        </Flex>
        <DottedUnderline />
      </Box>
      <Box>
        <Flex direction='row' justify='space-between' align='center'>
          <Box>{i18n.t('orderInfoTotalPrice')}</Box>
          <Box>
            <Text>{+price + +additPrice} p.</Text>
          </Box>
        </Flex>
        <DottedUnderline />
      </Box>
      {!hideOrderBtn && (
        <TouchableOpacity onPress={createOrder} style={styles.orderBtn}>
          <Text color='#fff' fontWeight='600'>
            {i18n.t('orderInfoOrderButton')}
            {+price + +additPrice} p.
          </Text>
        </TouchableOpacity>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  orderBtn: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#000',
    width: width - 28 - 32,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrderDetails;
