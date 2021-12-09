import React from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { Modal, Center, Text, Box } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import propStyles from '../../../resources/propStyles';

const { height } = Dimensions.get('window');

const TimePickerModal = ({ show, setShow, time, setTime }) => {
  const isAndroid = Platform.OS === 'android',
    isIOS = Platform.OS === 'ios';

  const onChangeTime = (event, selectedDate) => {
    const eType = event.type;
    const currentDate = selectedDate || time;
    setShow(isIOS);

    if (eType === 'set' && isAndroid) {
      setTime(selectedDate);
      setShow(false);
      return;
    } else if (eType === 'dismissed' && isAndroid) {
      setShow(false);
      return;
    }
    setTime(currentDate);
  };

  return (
    <>
      {isIOS ? (
        <Modal height={height} isOpen={show} onClose={() => setShow(false)}>
          <Modal.Content p='10px'>
            <Box>
              <DateTimePicker
                value={time instanceof Date ? time : new Date()}
                mode='time'
                is24Hour={true}
                display='spinner'
                onChange={onChangeTime}
                locale='ru-RU'
              />
            </Box>
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
          value={time instanceof Date ? time : new Date()}
          mode='time'
          is24Hour={true}
          display='default'
          onChange={onChangeTime}
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

export default TimePickerModal;
