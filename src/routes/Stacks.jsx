import React from 'react';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import propStyles from '../resources/propStyles';

import Tabs from './Tabs';
import CatalogPage from '../pages/CatalogPage';
import ActivateAppPage from '../pages/ActivateAppPage';
import SearchPage from '../pages/SearchPage';
import ContactsPage from '../pages/ContactsPage';
import СonditionsDeliveryPage from '../pages/СonditionsDeliveryPage';
import FavoritesPage from '../pages/FavoritesPage';

import CatalogHeader from '../components/CatalogPageComponents/CatalogHeader';
import SearchInput from '../components/Elements/SearchInput';

import { clearSearchInputText } from '../store/actions/search';
import HeaderBackBtn from '../components/Elements/HeaderBackBtn';

const Stack = createStackNavigator();

const Stacks = ({ navigation, isShowSearchIcon, clearSearchInputText }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleContainerStyle: { paddingVertical: 4 },
      }}
    >
      <Stack.Screen
        name='Tabs'
        component={Tabs}
        options={{
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
      <Stack.Screen
        name='ContactsPage'
        component={ContactsPage}
        options={{
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          headerTitle: 'Контакты',
        }}
      />
      <Stack.Screen
        name='СonditionsDeliveryPage'
        component={СonditionsDeliveryPage}
        options={{
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          headerTitle: 'Доставка',
        }}
      />
      <Stack.Screen
        name='SearchPage'
        component={SearchPage}
        options={{
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRightContainerStyle: { paddingRight: 16 },
          headerTitle: () => <SearchInput />,
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
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          headerTitleAlign: 'left',
          headerTitle: 'Кустовая роза',

          headerRight: () => <CatalogHeader />,
        }}
        name='CatalogPage'
        component={CatalogPage}
      />
      <Stack.Screen
        options={{
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          headerTitle: 'Избранное',
        }}
        name='FavoritesPage'
        component={FavoritesPage}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = ({ search: { isShowSearchIcon } }) => {
  return {
    isShowSearchIcon,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSearchInputText: () => dispatch(clearSearchInputText()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stacks);
