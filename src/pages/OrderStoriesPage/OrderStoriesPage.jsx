import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text, Flex, ScrollView } from 'native-base';
import propStyles from '../../resources/propStyles';
import { Entypo } from '@expo/vector-icons';
import i18n from 'i18n-js';

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
      payment: i18n.t('orderStoryPaymentOnline'),
      amount: '1 900.00',
    },
    {
      number: '123123',
      date: '25/07/2021',
      payment: i18n.t('orderStoryPaymentCash'),
      amount: '2 900.00',
    },
    {
      number: '123123',
      date: '25/07/2021',
      payment: i18n.t('orderStoryPaymentCard'),
      amount: '3 900.00',
    },
  ];

  return (
    <Box px='20px' flex={1} bg='#fff'>
      <ScrollView>
        <Box py='20px'>
          <Box>
            <Text color={propStyles.grayColor}>
              {i18n.t('orderStoryOrder')}: {orders?.length}
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
                <DetailItem
                  label={i18n.t('orderStoryOrderDate')}
                  value={el.date}
                />
                <DetailItem
                  label={i18n.t('orderStoryPaymentMethod')}
                  value={el.payment}
                />
                <DetailItem
                  label={i18n.t('orderStoryTotalPrice')}
                  value={el.amount + ' p.'}
                />
              </Box>
            ))
          ) : (
            <Box>213</Box>
          )}
        </Box>
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
