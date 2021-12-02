import React from 'react';

import { Dimensions } from 'react-native';
import { Select, CheckIcon, Box, Text } from 'native-base';

const { width } = Dimensions.get('window');
import i18n from 'i18n-js';

const SelectDeliveryExistTime = ({ time, setTime }) => {
  const times = [
      '09:00 - 11:00',
      '11:00 - 13:00',
      '13:00 - 15:00',
      '15:00 - 17:00',
      '17:00 - 19:00',
      '19:00 - 21:00',
      '21:00 - 23:00',
      '23:00 - 01:00',
      '01:00 - 03:00',
      '03:00 - 05:00',
      '05:00 - 07:00',
      '07:00 - 09:00',
    ],
    timeIntervals = times.map((time) => ({ label: time, value: time }));

  return (
    <Select
      width={width - 40}
      placeholder={i18n.t('selectJoinDeliveryInterval')}
      onValueChange={(itemValue) => setTime(itemValue)}
      _selectedItem={{
        endIcon: <CheckIcon size={4} />,
      }}
    >
      <Box px='16px'>
        <Text fontSize={16} fontWeight='bold'>
          {i18n.t('selectDayIntervals')}
        </Text>
      </Box>
      {timeIntervals.slice(0, 5).map((el) => (
        <Select.Item key={el.label} label={el.label} value={el.value} />
      ))}
      <Box p='16px'>
        <Text fontSize={16} fontWeight='bold'>
          {i18n.t('selectNightIntervals')}
        </Text>
      </Box>
      {timeIntervals.slice(6).map((el) => (
        <Select.Item key={el.label} label={el.label} value={el.value} />
      ))}
    </Select>
  );
};

export default SelectDeliveryExistTime;
