import React from 'react';

import { Box, StatusBar } from 'native-base';

import { Provider } from 'react-redux';
import store from './src/store/store';

import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import Routes from './src/routes/Drawers';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
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