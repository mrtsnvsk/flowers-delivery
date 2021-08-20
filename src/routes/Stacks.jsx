import React from 'react';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity, TextField } from 'react-native';
import { Flex, Box } from 'native-base';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import propStyles from '../resources/propStyles';

import Tabs from './Tabs';
import CatalogPage from '../pages/CatalogPage';
import ActivateAppPage from '../pages/ActivateAppPage';
import SearchPage from '../pages/SearchPage';

import CatalogHeader from '../components/CatalogPageComponents/CatalogHeader';
import SearchInput from '../components/Elements/SearchInput';

import { clearSearchInputText } from '../store/actions/search';

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
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.goBack()}
              name='chevron-back'
              size={24}
              color={propStyles.shadowColor}
            />
          ),
          headerTitleAlign: 'left',
          headerTitle: 'Кустовая роза',

          headerRight: () => <CatalogHeader />,
        }}
        name='CatalogPage'
        component={CatalogPage}
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
