import React from 'react';

import { Input } from 'native-base';
import propStyles from '../../../resources/propStyles';

const InputUnderline = ({ value, setValue, placeholder, type }) => {
  return (
    <Input
      value={value}
      onChangeText={(text) => setValue(text)}
      borderColor={propStyles.shadowedColor}
      isFullWidth
      placeholder={placeholder}
      autoCapitalize='none'
      keyboardType={type || 'default'}
    />
  );
};

export default InputUnderline;
