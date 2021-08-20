import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, ScrollView, Flex, Text } from 'native-base';
import BasketItem from '../../components/BasketPageComponents/BasketItem';
import propStyles from '../../resources/propStyles';
import HeaderInfo from '../../components/BasketPageComponents/HeaderInfo';
import AdditionalyAddItemsBlock from '../../components/BasketPageComponents/AdditionalyAddItemsBlock';

const BasketPage = () => {
  return (
    <Box p='16px' flex={1}>
      <ScrollView>
        <Box mb={3}>
          <BasketItem />
        </Box>
        <Box>
          <HeaderInfo label={'Рекомендуемы добавить'} />
          <AdditionalyAddItemsBlock />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default BasketPage;
