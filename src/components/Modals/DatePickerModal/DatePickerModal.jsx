import React from 'react';

import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Modal, Center, Text } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import propStyles from '../../../resources/propStyles';

const DatePickerModal = ({ show, setShow, date, setDate }) => {
  const isAndroid = Platform.OS === 'android',
    isIOS = Platform.OS === 'ios';

  const onChange = (event, selectedDate) => {
    const eType = event.type;
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    if (eType === 'set' && isAndroid) {
      setDate(selectedDate);
      setShow(false);
      return;
    } else if (eType === 'dismissed' && isAndroid) {
      setShow(false);
      return;
    }
    setDate(currentDate);
  };

  if (!show) return null;

  return (
    <>
      {isIOS ? (
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
      ) : show && isAndroid ? (
        <DateTimePicker
          value={date}
          mode='date'
          is24Hour={true}
          display='default'
          onChange={onChange}
          locale='ru-RU'
        />
      ) : null}
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
