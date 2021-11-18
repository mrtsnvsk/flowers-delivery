import React from 'react';

import { Box, Button } from 'native-base';
import { Alert } from 'react-native';

import ASDK from 'rn-asdk-tinkoff';

const ContactsPage = () => {
  const Tinkoff = new ASDK({
    terminal: '1612868226749DEMO',
    password: 'gw65jocdufobn1tj',
    publicKey:
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv5yse9ka3ZQE0feuGtemYv3IqOlLck8zHUM7lTr0za6lXTszRSXfUO7jMb+L5C7e2QNFs+7sIX2OQJ6a+HG8kr+jwJ4tS3cVsWtd9NXpsU40PE4MeNr5RqiNXjcDxA+L4OsEm/BlyFOEOh2epGyYUd5/iO3OiQFRNicomT2saQYAeqIwuELPs1XpLk9HLx5qPbm8fRrQhjeUD5TLO8b+4yCnObe8vy/BMUwBfq+ieWADIjwWCMp2KTpMGLz48qnaD9kdrYJ0iyHqzb2mkDhdIzkim24A3lWoYitJCBrrB2xM05sm9+OdCI1f7nPNJbl5URHobSwR94IRGT7CJcUjvwIDAQAB',
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
