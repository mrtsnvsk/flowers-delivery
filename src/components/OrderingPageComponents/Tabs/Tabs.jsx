import React from 'react';

import { StyleSheet, Dimensions } from 'react-native';
import { Flex, Text, Box } from 'native-base';
import propStyles from '../../../resources/propStyles';

const { width } = Dimensions.get('window');

const Tabs = ({ tabId }) => {
  const tabs = [
    {
      id: 0,
      name: 'Доставка',
    },
    {
      id: 1,
      name: 'Адрес',
    },
    {
      id: 2,
      name: 'Детали',
    },
    {
      id: 3,
      name: 'Оплата',
    },
  ];

  return (
    <Flex direction='row' justify='space-between' align='center'>
      {tabs.map((tab) => (
        <Box
          key={tab.id}
          style={[
            styles.tabItem,
            {
              borderBottomColor:
                tab.id <= tabId
                  ? propStyles.mainRedColor
                  : propStyles.grayColor,
              borderBottomWidth: tab.id <= tabId ? 3 : 1,
            },
          ]}
        >
          <Text
            color={tab.id === tabId ? propStyles.mainRedColor : '#000'}
            fontSize={15}
          >
            {tab.name}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    width: (width - 40) / 4,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: propStyles.mainRedColor,
  },
});

export default Tabs;
