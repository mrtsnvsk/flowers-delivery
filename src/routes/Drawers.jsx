import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Box } from 'native-base';

import Stacks from './Stacks';
import Tabs from './Tabs';

import DrawerLayout from '../components/Drawer';

const Drawer = createDrawerNavigator();

const Drawers = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Tabs'
      drawerContent={({ navigation }) => (
        <DrawerLayout navigation={navigation} />
      )}
    >
      <Drawer.Screen
        options={() => ({
          headerShown: false,
        })}
        name='Stacks'
        component={Stacks}
      />
    </Drawer.Navigator>
  );
};

export default Drawers;
