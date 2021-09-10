import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text, Flex, ScrollView } from 'native-base';
import propStyles from '../../resources/propStyles';
import { Entypo } from '@expo/vector-icons';

const DetailItem = ({ label, value }) => (
  <Flex mt={4} direction='row' justify='space-between' align='center'>
    <Box>
      <Text color={propStyles.grayColor}>{label}</Text>
    </Box>
    <Box>
      <Text fontWeight='600'>{value}</Text>
    </Box>
  </Flex>
);

const OrderStoriesPage = () => {
  const orders = [
    {
      number: '123123',
      date: '25/07/2021',
      payment: 'Оплата онлайн',
      amount: '1 900.00',
    },
    {
      number: '123123',
      date: '25/07/2021',
      payment: 'Оплата картой',
      amount: '2 900.00',
    },
    {
      number: '123123',
      date: '25/07/2021',
      payment: 'Оплата наличными',
      amount: '3 900.00',
    },
  ];

  return (
    <Box p='20px' flex={1} bg='#fff'>
      <ScrollView>
        <Box>
          <Text color={propStyles.grayColor}>
            {orders.length}{' '}
            {!orders?.length
              ? '0 заказов'
              : orders?.length === 1
              ? 'заказ'
              : orders?.length > 1 && orders?.length <= 4
              ? 'заказа'
              : 'заказов'}
          </Text>
        </Box>
        {orders.length ? (
          orders.map((el, i) => (
            <Box key={i} mt={5}>
              <TouchableOpacity style={styles.detailsBtn}>
                <Box>
                  <Text fontWeight='600'>#{el.number}</Text>
                </Box>
                <Box>
                  <Entypo name='chevron-right' size={24} color='#000' />
                </Box>
              </TouchableOpacity>
              <DetailItem label='Дата заказа' value={el.date} />
              <DetailItem label='Способ оплаты' value={el.payment} />
              <DetailItem label='Всего' value={el.amount + ' p.'} />
            </Box>
          ))
        ) : (
          <Box>213</Box>
        )}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  detailsBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: propStyles.shadowedColor,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
});

export default OrderStoriesPage;
