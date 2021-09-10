import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Modal, Flex } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

const SortModal = ({ open, setOpen }) => {
  return (
    <Modal size='md' isOpen={open} onClose={() => setOpen(false)}>
      <Modal.Content>
        <Box pb={0}>
          <TouchableOpacity style={styles.sortBtn}>
            <Box mr={3}>
              <FontAwesome5 name='sort-amount-up' size={24} color='black' />
            </Box>
            <Box>Цена по возрастанию</Box>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortBtn}>
            <Box mr={3}>
              <FontAwesome5 name='sort-amount-down' size={24} color='black' />
            </Box>
            <Box>Цена по убыванию</Box>
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
