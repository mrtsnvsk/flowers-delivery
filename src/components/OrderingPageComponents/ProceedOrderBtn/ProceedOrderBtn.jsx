import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Center, Text } from 'native-base';

const ProceedOrderBtn = ({ tab, setTab }) => {
  return (
    <Center mt='30px'>
      <TouchableOpacity
        onPress={() => setTab((prevTab) => prevTab + 1)}
        style={styles.submitBtn}
      >
        <Text textAlign='center' color='#fff'>
          Продолжить оформление
        </Text>
      </TouchableOpacity>
    </Center>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    alignItems: 'center',
    backgroundColor: '#000',
    width: 240,
    borderRadius: 4,
    paddingVertical: 14,
  },
});

export default ProceedOrderBtn;
