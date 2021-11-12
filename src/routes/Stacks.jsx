import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import propStyles from '../resources/propStyles';

import GreetingPage from '../pages/GreetingPage';
import Tabs from './Tabs';
import CatalogPage from '../pages/CatalogPage';
import ActivateAppPage from '../pages/ActivateAppPage';
import SearchPage from '../pages/SearchPage';
import ContactsPage from '../pages/ContactsPage';
import СonditionsDeliveryPage from '../pages/СonditionsDeliveryPage';
import FavoritesPage from '../pages/FavoritesPage';
import FiltersPage from '../pages/FiltersPage';
import OrderingPage from '../pages/OrderingPage';
import OrderStoriesPage from '../pages/OrderStoriesPage';
import MapPage from '../pages/MapPage';
import ConfidentialityPage from '../pages/ConfidentialityPage';
import BonusesPage from '../pages/BonusesPage';
import NotificationsPage from '../pages/NotificationsPage';
import ProductPage from '../pages/ProductPage';
import PromosPage from '../pages/PromosPage';

import CatalogHeader from '../components/CatalogPageComponents/CatalogHeader';
import SearchInput from '../components/Elements/SearchInput';
import HeaderBackBtn from '../components/Elements/HeaderBackBtn';
import SpinnerFw from '../components/Elements/SpinnerFw';

import {
  clearSearchInputText,
  setOrderingAddressTerm,
} from '../store/actions/search';
import { updateSearchProductsTerm } from '../store/actions/product';
import { checkAuthUser } from '../store/actions/auth';
import i18n from 'i18n-js';

const Stack = createStackNavigator();

const Stacks = ({
  navigation,
  isShowSearchIcon,
  clearSearchInputText,
  setOrderingAddressTerm,
  isOrderingAddressTerm,
  searchProductsTerm,
  updateSearchProductsTerm,
  loadingIsAuth,
  checkAuthUser,
}) => {
  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

  if (loadingIsAuth) {
    return <SpinnerFw />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleContainerStyle: { paddingVertical: 4 },
        headerLeft: () => <HeaderBackBtn navigation={navigation} />,
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRightContainerStyle: { paddingRight: 16 },
        headerTitleAlign: 'left',
      }}
    >
      <Stack.Screen
        name='GreetingPage'
        component={GreetingPage}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ActivateAppPage'
        component={ActivateAppPage}
        options={{
          headerShown: false,
        }}
      />
      <>
        <Stack.Screen
          name='Tabs'
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='ProductPage'
          component={ProductPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='ContactsPage'
          component={ContactsPage}
          options={{
            headerTitle: i18n.t('stackContacts'),
          }}
        />
        <Stack.Screen
          name='СonditionsDeliveryPage'
          component={СonditionsDeliveryPage}
          options={{
            headerTitle: i18n.t('stackDelivery'),
          }}
        />
        <Stack.Screen
          name='SearchPage'
          component={SearchPage}
          options={{
            headerTitle: () => (
              <SearchInput
                term={searchProductsTerm}
                setTerm={updateSearchProductsTerm}
              />
            ),
            headerLeft: () => (
              <Ionicons
                onPress={() => navigation.goBack()}
                name='chevron-back'
                size={24}
                color={propStyles.shadowColor}
              />
            ),
            headerRight: () =>
              isShowSearchIcon ? (
                <TouchableOpacity>
                  <FontAwesome
                    name='search'
                    size={20}
                    color={propStyles.shadowColor}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={clearSearchInputText}>
                  <AntDesign
                    name='close'
                    size={24}
                    color={propStyles.shadowColor}
                  />
                </TouchableOpacity>
              ),
          }}
        />
        <Stack.Screen
          options={{
            headerTitle: '',
            headerRight: () => <CatalogHeader />,
          }}
          name='CatalogPage'
          component={CatalogPage}
        />
        <Stack.Screen
          options={{
            headerTitle: i18n.t('stackFavorite'),
          }}
          name='FavoritesPage'
          component={FavoritesPage}
        />
        <Stack.Screen
          options={{
            headerTitle: i18n.t('stackFilter'),
            headerRight: () => <CatalogHeader navigation={navigation} />,
          }}
          name='FiltersPage'
          component={FiltersPage}
        />
        <Stack.Screen
          options={{
            headerTitle: i18n.t('stackRegisterOrder'),
          }}
          name='OrderingPage'
          component={OrderingPage}
        />
        <Stack.Screen
          options={{
            headerTitle: i18n.t('stackOrdersHistory'),
          }}
          name='OrderStoriesPage'
          component={OrderStoriesPage}
        />
        <Stack.Screen
          options={{
            headerTitle: () => (
              <SearchInput
                term={isOrderingAddressTerm}
                setTerm={setOrderingAddressTerm}
                w={100}
              />
            ),
          }}
          name='MapPage'
          component={MapPage}
        />
        <Stack.Screen
          options={{
            headerTitle: i18n.t('stackConfidentiality'),
          }}
          name='ConfidentialityPage'
          component={ConfidentialityPage}
        />
        <Stack.Screen
          options={{
            headerTitle: i18n.t('stackBonuses'),
          }}
          name='BonusesPage'
          component={BonusesPage}
        />
        <Stack.Screen
          options={{
            headerTitle: i18n.t('stackNotifications'),
          }}
          name='NotificationsPage'
          component={NotificationsPage}
        />
        <Stack.Screen
          options={{
            headerTitle: i18n.t('stackPromos'),
          }}
          name='PromosPage'
          component={PromosPage}
        />
      </>
    </Stack.Navigator>
  );
};

const mapStateToProps = ({
  search: { isShowSearchIcon, isOrderingAddressTerm },
  products: { searchProductsTerm },
  auth: { loadingIsAuth },
}) => ({
  isShowSearchIcon,
  isOrderingAddressTerm,
  searchProductsTerm,
  loadingIsAuth,
});

const mapDispatchToProps = (dispatch) => ({
  clearSearchInputText: () => dispatch(clearSearchInputText()),
  setOrderingAddressTerm: (term) => dispatch(setOrderingAddressTerm(term)),
  updateSearchProductsTerm: (term) => dispatch(updateSearchProductsTerm(term)),
  checkAuthUser: () => dispatch(checkAuthUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stacks);
