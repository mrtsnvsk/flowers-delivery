import React from 'react';

import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Modal, Center, Text, Box } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import propStyles from '../../../resources/propStyles';

const DatePickerModal = ({ show, setShow, date, setDate }) => {
  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  if (!show) return null;

  return (
    <>
      {Platform.OS === 'ios' ? (
        <Modal isOpen={show} onClose={() => setShow(false)}>
          <Modal.Content width='100%' p='10px'>
            <DateTimePicker
              value={date}
              mode='date'
              is24Hour={true}
              display='spinner'
              onChange={onChange}
              locale='ru-RU'
            />
            <Center py='10px'>
              <TouchableOpacity
                style={styles.submitJoinTime}
                onPress={() => setShow(false)}
              >
                <Text color='#fff'>OK</Text>
              </TouchableOpacity>
            </Center>
          </Modal.Content>
        </Modal>
      ) : (
        <DateTimePicker
          value={date}
          mode='date'
          is24Hour={true}
          display='spinner'
          onChange={onChange}
          locale='ru-RU'
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  submitJoinTime: {
    backgroundColor: propStyles.mainRedColor,
    paddingHorizontal: 50,
    paddingVertical: 8,
    borderRadius: 5,
  },
});

export default DatePickerModal;
