import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';

import { Box, ScrollView } from 'native-base';
import BasketItems from '../../components/BasketPageComponents/BasketItems';
import HeaderInfo from '../../components/BasketPageComponents/HeaderInfo';
import AdditionalyAddItemsBlock from '../../components/BasketPageComponents/AdditionalyAddItemsBlock';

import { getOrderList, setOrderList } from '../../store/actions/order';
import { getOrderFromStorage } from '../../resources/utils';
import AddCoupon from '../../components/BasketPageComponents/AddCoupon';
import OrderDetails from '../../components/BasketPageComponents/OrderDetails';

const BasketPage = ({ getOrderList, orderList, setOrderList }) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

  useFocusEffect(
    useCallback(() => {
      setOrder(orderList.map((el) => ({ ...el, count: el?.count || 1 })));
    }, [orderList])
  );

  const deleteFromBasket = async (id) => {
    const prevList = await getOrderFromStorage(),
      list = prevList.filter((el) => el.name !== id);
    setOrderList(list);
  };

  return (
    <Box p='16px' pb={0} flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb={3}>
          {order.length ? (
            <BasketItems
              deleteItem={deleteFromBasket}
              order={order}
              setOrder={setOrder}
            />
          ) : null}
        </Box>
        <AdditionalyAddItemsBlock />

        <OrderDetails order={orderList} />
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({ order: { orderList } }) => {
  return {
    orderList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: () => dispatch(getOrderList()),
    setOrderList: (data) => dispatch(setOrderList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
