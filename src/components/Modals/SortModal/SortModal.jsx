import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Modal, Flex } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';
import i18n from 'i18n-js';

const SortModal = ({ open, setOpen, orderPrice, setOrderPrice }) => {
  const setOrderSort = (order) => {
    setOpen(false);
    setOrderPrice(order);
  };

  const checkActiveOrder = (order) =>
    order === orderPrice ? propStyles.orangeColor : '#000';

  return (
    <Modal size='md' isOpen={open} onClose={() => setOpen(false)}>
      <Modal.Content>
        <Box p={4} pb={0}>
          <TouchableOpacity
            onPress={() => setOrderSort(null)}
            style={styles.sortBtn}
          >
            <Box w={28} mr={3}>
              <FontAwesome5
                name='sort'
                size={24}
                color={checkActiveOrder(null)}
              />
            </Box>
            <Box
              _text={{
                color: checkActiveOrder(null),
              }}
            >
              {i18n.t('sortDefault')}
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOrderSort('ASC')}
            style={styles.sortBtn}
          >
            <Box w={28} mr={3}>
              <FontAwesome5
                name='sort-amount-up'
                size={24}
                color={checkActiveOrder('ASC')}
              />
            </Box>
            <Box
              _text={{
                color: checkActiveOrder('ASC'),
              }}
            >
              {i18n.t('sortAscPrice')}
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOrderSort('DESC')}
            style={styles.sortBtn}
          >
            <Box w={28} mr={3}>
              <FontAwesome5
                name='sort-amount-down'
                size={24}
                color={checkActiveOrder('DESC')}
              />
            </Box>
            <Box
              _text={{
                color: checkActiveOrder('DESC'),
              }}
            >
              {i18n.t('sortDescPrice')}
            </Box>
          </TouchableOpacity>
        </Box>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default SortModal;
