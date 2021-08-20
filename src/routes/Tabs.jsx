import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import propStyles from '../resources/propStyles';

import MainPage from '../pages/MainPage';
import CategoriesPage from '../pages/CategoriesPage';
import BasketPage from '../pages/BasketPage';
import ProfilePage from '../pages/ProfilePage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: propStyles.mainRedColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingTop: 7,
          paddingBottom: 7,
        },
      }}
    >
      <Tab.Screen
        name='MainPage'
        component={MainPage}
        options={{
          tabBarLabel: 'Акции',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name='home' size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='CategoriesPage'
        component={CategoriesPage}
        options={{
          tabBarLabel: 'Каталог',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='flower-tulip-outline'
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='BasketPage'
        component={BasketPage}
        options={{
          tabBarLabel: 'Корзина',
          headerTitle: 'Корзина',
          headerTitleAlign: 'left',
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 20 }}>
              <Text fontSize={14} color={propStyles.blueActiveColor}>
                Очистить корзину
              </Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name='basket' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfilePage'
        component={ProfilePage}
        options={{
          tabBarLabel: 'Профиль',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='user' size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
