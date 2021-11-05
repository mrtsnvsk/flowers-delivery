import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Flex } from 'native-base';
import propStyles from '../../../resources/propStyles';

import i18n from 'i18n-js';

const BlockHeader = ({ label, actionFn }) => {
  return (
    <Flex
      px='20px'
      mt='20px'
      mb={4}
      direction='row'
      justify='space-between'
      alignItems='center'
    >
      <Box _text={styles.labelText}>{label}</Box>
      <TouchableOpacity onPress={actionFn}>
        <Box _text={styles.showAllText}>{i18n.t('blockHeaderShowAll')}</Box>
      </TouchableOpacity>
    </Flex>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 20,
    fontWeight: '500',
  },
  showAllText: {
    fontSize: 14,
    color: propStyles.mainRedColor,
    fontWeight: '500',
  },
});

export default BlockHeader;
