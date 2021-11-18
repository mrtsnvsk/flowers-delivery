import React from 'react';

import { Box, Button } from 'native-base';
import { Alert } from 'react-native';

import ASDK from 'rn-asdk-tinkoff';

const ContactsPage = () => {
  const Tinkoff = new ASDK({
    terminal: '1612868226749DEMO',
    password: 'gw65jocdufobn1tj',
    publicKey:
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqBiorLS9OrFPezixO5lSsF+HiZPFQWDO7x8gBJp4m86Wwz7ePNE8ZV4sUAZBqphdqSpXkybM4CJwxdj5R5q9+RHsb1dbMjThTXniwPpJdw4WKqG5/cLDrPGJY9NnPifBhA/MthASzoB+60+jCwkFmf8xEE9rZdoJUc2p9FL4wxKQPOuxCqL2iWOxAO8pxJBAxFojioVu422RWaQvoOMuZzhqUEpxA9T62lN8t3jj9QfHXaL4Ht8kRaa2JlaURtPJB5iBM+4pBDnqObNS5NFcXOxloZX4+M8zXaFh70jqWfiCzjyhaFg3rTPE2ClseOdS7DLwfB2kNP3K0GuPuLzsMwIDAQAB',
  });

  const test = async () => {
    try {
      const init = {
        OrderID: '1', // ID заказа в вашей системе
        Amount: 32345, // сумма для оплаты (в копейках)
        PaymentName: 'НАЗВАНИЕ ПЛАТЕЖА', // название платежа, видимое пользователю
        PaymentDesc: 'ОПИСАНИЕ ПЛАТЕЖА', // описание платежа, видимое пользователю
        CardID: 'CARD-ID', // ID карточки
        //Email: "batman@gotham.co",         // E-mail клиента для отправки уведомления об оплате
        //CustomerKey: null,                 // ID клиента для сохранения карты
        // тестовые:
        Email: 'testCustomerKey1@gmail.com',
        CustomerKey: 'testCustomerKey1@gmail.com',
        IsRecurrent: false, // флаг определяющий является ли платеж рекуррентным [1]
        UseSafeKeyboard: true, // флаг использования безопасной клавиатуры [2]
        ExtraData: {},
        GooglePayParams: {
          MerchantName: 'test',
          AddressRequired: false,
          PhoneRequired: false,
          Environment: 'TEST', // "SANDBOX", "PRODUCTION"
        },
        Taxation: 'usn_income',
        Items: [
          {
            Name: 'test 1',
            Price: 1000, // В копейках (100 рублей)
            Quantity: 2,
            Amount: 1001, // В копейках (200 рублей)
            Tax: 'usn_income',
          },
          {
            Name: 'test 2',
            Price: 123,
            Quantity: 1,
            Amount: 321,
            Tax: 'usn_income',
          },
        ],
      };
      const result = await Tinkoff.payWithCard({
        orderId: (Math.random() * 100000000000).toFixed(0),
        amount: 400,
        title: 'Покупка',
        description: 'Розовые кеды Adadas',
      });

      console.log('result', result);

      // const res = await Tinkoff.payWithCard({
      //   orderId: (Math.random() * 100000000000).toFixed(0),
      //   amount: 1000,
      //   title: 'Покупка',
      //   description: 'Описание покупки',
      //   // for marketplace only
      //   shops: [
      //     {
      //       ShopCode: '100',
      //       Amount: 10,
      //       Fee: 10,
      //     },
      //   ],
      // });
      // if (res) {
      //   Alert.alert('Оплата', 'Успех!');
      // } else {
      //   Alert.alert('Оплата', 'Отмена');
      // }
    } catch (e) {
      console.log(e);
      // Alert.alert('Ошибка оплаты', error.message);
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
