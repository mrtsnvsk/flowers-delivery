import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Box, Flex, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

import DottedUnderline from '../DottedUnderline';
import { onAlert } from '../../../resources/utils';
const { width } = Dimensions.get('window');
import i18n from 'i18n-js';
import OrderDetailLine from '../../OrderingPageComponents/OrderDetailLine/OrderDetailLine';

const OrderDetails = ({ order, hideOrderBtn, hideTotalPrice, isAuth }) => {
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
    if (!isAuth) {
      onAlert('Заказ доступен только авторизированным пользователям!');
      return;
    }

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
      pb='0px'
    >
      <OrderDetailLine
        text={i18n.t('orderInfoProducts')}
        count={order.length}
        price={price}
      />
      <OrderDetailLine
        text={i18n.t('orderInfoAddit')}
        count={order?.reduce((acc, val) => +acc + +val.additItems.length, 0)}
        price={additPrice}
      />
      {!hideTotalPrice && (
        <OrderDetailLine
          text={i18n.t('orderInfoTotalPrice')}
          price={+price + +additPrice}
        />
      )}
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

const mapStateToProps = ({ auth: { isAuth } }) => ({
  isAuth,
});

export default connect(mapStateToProps)(OrderDetails);
