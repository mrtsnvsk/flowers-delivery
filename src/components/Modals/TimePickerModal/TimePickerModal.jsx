import React from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { Modal, Center, Text, Box, ScrollView } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import propStyles from '../../../resources/propStyles';

const { width, height } = Dimensions.get('window');

const TimePickerModal = ({
  show,
  setShow,
  timeFrom,
  timeTo,
  setTimeFrom,
  setTimeTo,
}) => {
  const onChangeTimeFrom = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setTimeFrom(currentDate);
  };

  const onChangeTimeTo = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setTimeTo(currentDate);
  };

  return (
    <Modal
      size='lg'
      height={height}
      isOpen={show}
      onClose={() => setShow(false)}
    >
      <Modal.Content p='10px' height={height}>
        <ScrollView>
          <Box>
            <Text fontSize={16} fontWeight='bold'>
              Время от:
            </Text>
            <DateTimePicker
              value={timeFrom}
              mode='time'
              is24Hour={true}
              display='spinner'
              onChange={onChangeTimeFrom}
            />
          </Box>
          <Box>
            <Text fontSize={16} fontWeight='bold'>
              Время до:
            </Text>
            <DateTimePicker
              value={timeTo}
              mode='time'
              is24Hour={true}
              display='spinner'
              onChange={onChangeTimeTo}
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
        </ScrollView>
      </Modal.Content>
    </Modal>
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
