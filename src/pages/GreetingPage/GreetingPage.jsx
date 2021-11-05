import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Box, Center, Image, Text } from 'native-base';

import { getUserPhone } from '../../resources/utils';

import i18n from 'i18n-js';

const Greetingpage = ({ isAuth }) => {
  const navigation = useNavigation();

  const [userPhone, setUserPhone] = useState('');
  const curHours = new Date().getHours();

  useEffect(() => {
    (async () => {
      if (isAuth) {
        setUserPhone(await getUserPhone());
      }
    })();
    setTimeout(() => {
      navigation.navigate(isAuth ? 'Tabs' : 'ActivateAppPage');
    }, 3000);
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
              ? i18n.t('goodMorning')
              : curHours >= 12 && curHours <= 16
              ? i18n.t('goodDay')
              : curHours >= 17 && curHours <= 21
              ? i18n.t('goodEvening')
              : i18n.t('goodNight')}
            {`, ${userPhone}!`}
          </Text>
        ) : (
          <Text italic fontSize={18}>
            {i18n.t('hello')}
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
