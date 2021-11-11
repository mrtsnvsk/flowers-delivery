import React, { useState } from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Box, Text } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';

import i18n from 'i18n-js';
import BlockLabel from '../BlockLabel';
import TimePickerModal from '../../Modals/TimePickerModal';

const { width } = Dimensions.get('window');

const DateTimePicker = ({ children, show, setShow, label, desc }) => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      {children}
      <BlockLabel label={label} />
      <TouchableOpacity
        onPress={() => setShow(!show)}
        style={styles.joinTimeWrapper}
      >
        <Box width={width - 60}>
          <Text fontSize='14' color='#000'>
            {desc}
          </Text>
        </Box>
        <Box width={40}>
          <Entypo name='chevron-right' size={24} color={propStyles.grayColor} />
        </Box>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  joinTimeWrapper: {
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DateTimePicker;
