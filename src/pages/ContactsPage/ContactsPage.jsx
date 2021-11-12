import React from 'react';

import { Box, Button } from 'native-base';
import { Alert } from 'react-native';

import ASDK from 'rn-asdk-tinkoff';

const Tinkoff = new ASDK({
  test: true,
  terminal: '1612868226749DEMO',
  password: 'gw65jocdufobn1tj',
  publicKey:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqBiorLS9OrFPezixO5lSsF+HiZPFQWDO7x8gBJp4m86Wwz7ePNE8ZV4sUAZBqphdqSpXkybM4CJwxdj5R5q9+RHsb1dbMjThTXniwPpJdw4WKqG5/cLDrPGJY9NnPifBhA/MthASzoB+60+jCwkFmf8xEE9rZdoJUc2p9FL4wxKQPOuxCqL2iWOxAO8pxJBAxFojioVu422RWaQvoOMuZzhqUEpxA9T62lN8t3jj9QfHXaL4Ht8kRaa2JlaURtPJB5iBM+4pBDnqObNS5NFcXOxloZX4+M8zXaFh70jqWfiCzjyhaFg3rTPE2ClseOdS7DLwfB2kNP3K0GuPuLzsMwIDAQAB',
});

const ContactsPage = () => {
  const test = async () => {
    try {
      const res = await Tinkoff.payWithCard({
        orderId: (Math.random() * 100000000000).toFixed(0),
        amount: 1000,
        title: 'Покупка',
        description: 'Описание покупки',
        // for marketplace only
        shops: [
          {
            ShopCode: '100',
            Amount: 10,
            Fee: 10,
          },
        ],
      });
      if (res) {
        Alert.alert('Оплата', 'Успех!');
      } else {
        Alert.alert('Оплата', 'Отмена');
      }
    } catch (error) {
      Alert.alert('Ошибка оплаты', error.message);
    }
  };

  return (
    <Box>
      <Button mt='30px' onPress={test}>
        test
      </Button>
    </Box>
  );
};

export default ContactsPage;

