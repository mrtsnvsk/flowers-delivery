import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Box, Center, Image, Text } from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserPhone } from '../../resources/utils';

const Greetingpage = ({ isAuth }) => {
  const [userPhone, setUserPhone] = useState('');
  const curHours = new Date().getHours();

  useEffect(() => {
    (async () => {
      if (isAuth) {
        setUserPhone(await getUserPhone());
      }
    })();
  }, [isAuth]);

  const logo =
    'https://florcat.ru/upload/delight.webpconverter/local/templates/florcat/images/logo.png.webp?162728356719376';

  return (
    <Center bg='#fff' flex={1}>
      <Box>
        <Image
          resizeMode='stretch'
          width={300}
          height={200}
          source={{ uri: logo }}
          alt='Florcat'
        />
      </Box>
      <Box>
        {isAuth ? (
          <Text italic>
            {curHours >= 5 && curHours <= 11
              ? 'Доброе утро'
              : curHours >= 12 && curHours <= 16
              ? 'Добрый день'
              : curHours >= 17 && curHours <= 21
              ? 'Добрый вечер'
              : 'Доброй ночи'}
            {`, ${userPhone}!`}
          </Text>
        ) : (
          <Text italic fontSize={18}>
            Здравствуйте!
          </Text>
        )}
      </Box>
    </Center>
  );
};

const mapStateToProps = ({ auth: { isAuth } }) => ({
  isAuth,
});

export default connect(mapStateToProps)(Greetingpage);
