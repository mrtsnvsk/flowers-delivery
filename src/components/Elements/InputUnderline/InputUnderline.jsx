import React from 'react';

import { Input } from 'native-base';
import propStyles from '../../../resources/propStyles';

const InputUnderline = ({ value, setValue, placeholder }) => {
  return (
    <Input
      value={value}
      onChangeText={(text) => setValue(text)}
      borderColor={propStyles.shadowedColor}
      isFullWidth
      placeholder={placeholder}
      autoCapitalize='none'
    />
  );
};

export default InputUnderline;
