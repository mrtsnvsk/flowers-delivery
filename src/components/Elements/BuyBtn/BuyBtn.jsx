import React from 'react';

import { StyleSheet } from 'react-native';
import { Box, Text } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';

const BuyBtn = ({ price }) => {
  return (
    <Box style={styles.btnWrap}>
      <Box>
        <SimpleLineIcons name='basket' size={20} color='black' />
      </Box>
      <Box>
        <Text style={styles.priceText}>{price} р.</Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  btnWrap: {
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 114,
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 14,
    ...propStyles.shadowDefault,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BuyBtn;
