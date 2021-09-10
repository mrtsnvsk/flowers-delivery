import React, { useState } from 'react';

import { Select, CheckIcon } from 'native-base';
import propStyles from '../../../resources/propStyles';

const SelectOrderAddress = () => {
  let [language, setLanguage] = useState('');

  return (
    <Select
      accessibilityLabel='Адрес самовывоза'
      placeholder='Выберите адрес самовывоза'
      onValueChange={(itemValue) => setLanguage(itemValue)}
      _selectedItem={{
        bg: propStyles.shadowedColor,
        endIcon: <CheckIcon size={4} />,
      }}
    >
      <Select.Item label='Ходакова, 10' value='10' />
      <Select.Item label='Донбасса, 32' value='32' />
      <Select.Item label='Криворукого, 1' value='1' />
      <Select.Item label='Кривошеевого, 13' value='13' />
    </Select>
  );
};

export default SelectOrderAddress;
