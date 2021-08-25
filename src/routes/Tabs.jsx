import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TouchableOpacity, StyleSheet } from 'react-native';
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

import { setOrderList, getOrderList } from '../store/actions/order';

const Tab = createBottomTabNavigator();

const Tabs = ({ setOrderList, orderListCount, getOrderList }) => {
  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

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
          tabBarLabel: 'Главная',
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
          tabBarBadge: orderListCount > 0 ? orderListCount : null,
          tabBarBadgeStyle: styles.basketBadge,
          tabBarLabel: 'Корзина',
          headerTitle: 'Корзина',
          headerTitleAlign: 'left',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setOrderList([])}
              style={{ paddingRight: 20 }}
            >
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

const styles = StyleSheet.create({
  basketBadge: {
    backgroundColor: '#FEA800',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    minWidth: 18,
    width: 18,
    maxHeight: 18,
    height: 18,
    paddingLeft: 4,
    paddingRight: 4,
    alignSelf: 'center',
    left: 8,
    top: 0,
  },
});

const mapStateToProps = ({ order: { orderListCount } }) => {
  return {
    orderListCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderList: (data) => dispatch(setOrderList(data)),
    getOrderList: () => dispatch(getOrderList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
