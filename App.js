import React, { useEffect } from 'react';

import { Box, StatusBar, extendTheme } from 'native-base';

import { Provider } from 'react-redux';
import store from './src/store/store';

import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import Routes from './src/routes/Drawers';

import {
  allowLocation,
  sheduleNotifications,
  registerExpoPushTokens,
} from './src/resources/utils';
import * as ruLocale from './src/resources/ruLocale.json';
import * as engLocal from './src/resources/enLocale.json';
import * as Linking from 'expo-linking';
//
import i18n from 'i18n-js';

sheduleNotifications();
i18n.translations = {
  en: engLocal.en,
  ru: ruLocale.ru,
};

const prefix = Linking.createURL('/');

const App = () => {
  useEffect(() => {
    allowLocation();
    registerExpoPushTokens();
  }, []);

  const linking = {
    // prefixes: ['https://*.florcat.com','florcat://'],
    prefixes: [prefix],
    config: {
      screens: {
        Stacks: {
          initialRouteName: 'Tabs',
          screens: {
            ProductPage: 'product/:id',
          },
        },
      },
    },
  };

  const theme = extendTheme({
    colors: {
      // Add new color
      mainRedColor: {
        100: 'rgb(176, 108, 150)',
        200: 'rgb(176, 108, 150)',
        300: 'rgb(176, 108, 150)',
        400: 'rgb(176, 108, 150)',
        500: 'rgb(176, 108, 150)',
        600: 'rgb(176, 108, 150)',
        700: 'rgb(176, 108, 150)',
        800: 'rgb(176, 108, 150)',
        900: 'rgb(176, 108, 150)',
      },
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer linking={linking}>
          <Box height='100%' safeAreaBottom>
            <StatusBar
              animated={true}
              backgroundColor='#fff'
              barStyle={'dark-content'}
              showHideTransition={'fade'}
            />
            <Routes />
          </Box>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
