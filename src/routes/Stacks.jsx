import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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
//
import Test from '../pages/Test';

import CatalogHeader from '../components/CatalogPageComponents/CatalogHeader';
import SearchInput from '../components/Elements/SearchInput';
import HeaderBackBtn from '../components/Elements/HeaderBackBtn';

import {
  clearSearchInputText,
  setOrderingAddressTerm,
} from '../store/actions/search';
import { updateSearchProductsTerm } from '../store/actions/product';
import { checkAuthUser } from '../store/actions/auth';

const Stack = createStackNavigator();

const Stacks = ({
  navigation,
  isShowSearchIcon,
  clearSearchInputText,
  setOrderingAddressTerm,
  isOrderingAddressTerm,
  searchProductsTerm,
  updateSearchProductsTerm,
  isActivateApp,
  loadingIsAuth,
  checkAuthUser,
}) => {
  const [startPage, setStartPage] = useState(true);

  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

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
      {/* {loadingIsAuth ? (
        <Stack.Screen
          name='GreetingPage'
          component={GreetingPage}
          options={{
            headerShown: false,
          }}
        />
      ) : !isActivateApp ? (
        <Stack.Screen
          name='ActivateAppPage'
          component={ActivateAppPage}
          options={{
            headerShown: false,
          }}
        />
      ) : ( */}
      <>
        <Stack.Screen
          name='Tabs'
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='Test' component={Test} />

        <Stack.Screen
          name='ContactsPage'
          component={ContactsPage}
          options={{
            headerTitle: 'Контакты',
          }}
        />
        <Stack.Screen
          name='СonditionsDeliveryPage'
          component={СonditionsDeliveryPage}
          options={{
            headerTitle: 'Доставка',
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
            headerTitle: 'Избранное',
          }}
          name='FavoritesPage'
          component={FavoritesPage}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Фильтр',
            headerRight: () => <CatalogHeader navigation={navigation} />,
          }}
          name='FiltersPage'
          component={FiltersPage}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Оформление заказа',
          }}
          name='OrderingPage'
          component={OrderingPage}
        />
        <Stack.Screen
          options={{
            headerTitle: 'История заказов',
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
            headerTitle: 'Конфиденциальность',
          }}
          name='ConfidentialityPage'
          component={ConfidentialityPage}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Бонусы',
          }}
          name='BonusesPage'
          component={BonusesPage}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Уведомления',
          }}
          name='NotificationsPage'
          component={NotificationsPage}
        />
      </>
      {/* )} */}
    </Stack.Navigator>
  );
};

const mapStateToProps = ({
  search: { isShowSearchIcon, isOrderingAddressTerm },
  products: { searchProductsTerm },
  auth: { isActivateApp, loadingIsAuth },
}) => ({
  isShowSearchIcon,
  isOrderingAddressTerm,
  searchProductsTerm,
  isActivateApp,
  loadingIsAuth,
});

const mapDispatchToProps = (dispatch) => ({
  clearSearchInputText: () => dispatch(clearSearchInputText()),
  setOrderingAddressTerm: (term) => dispatch(setOrderingAddressTerm(term)),
  updateSearchProductsTerm: (term) => dispatch(updateSearchProductsTerm(term)),
  checkAuthUser: () => dispatch(checkAuthUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stacks);
