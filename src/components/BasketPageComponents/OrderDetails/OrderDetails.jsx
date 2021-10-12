import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Box, Flex, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

import DottedUnderline from '../DottedUnderline';

const { width } = Dimensions.get('window');

import { onAlert } from '../../../resources/utils';

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
      setAdditPrice(
        order.reduce((acc, val) => (acc += +val?.package?.price || 0), 0)
      );
    } else {
      setPrice(0);
      setAdditPrice(0);
    }
  };

  const createOrder = () => {
    price > 0
      ? navigation.navigate('OrderingPage')
      : onAlert('Чтобы оформить заказ для начала выберите товар!');
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
          <Box>Товары</Box>
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
          <Box>Дополнительно</Box>
          <Flex direction='row' align='center'>
            <Box mr={1}>
              <Text>x{order.filter((el) => el?.package).length}</Text>
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
          <Box>Всего</Box>
          <Box>
            <Text>{+price + +additPrice} p.</Text>
          </Box>
        </Flex>
        <DottedUnderline />
      </Box>
      {!hideOrderBtn && (
        <TouchableOpacity onPress={createOrder} style={styles.orderBtn}>
          <Text color='#fff' fontWeight='600'>
            Заказать за: {+price + +additPrice} p.
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
