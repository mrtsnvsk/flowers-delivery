import React from 'react';

import { Dimensions } from 'react-native';
import { Select, CheckIcon, Box, Text } from 'native-base';

const { width } = Dimensions.get('window');
import i18n from 'i18n-js';

const SelectDeliveryExistTime = ({ time, setTime }) => {
  const times = [
      '09-11',
      '11-13',
      '13-15',
      '15-17',
      '17-19',
      '19-21',
      '21-23',
      '23-01',
      '01-03',
      '03-05',
      '05-07',
      '07-09',
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
