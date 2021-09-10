import React from 'react';

import { Input } from 'native-base';
import propStyles from '../../../resources/propStyles';

const InputUnderline = ({ value, setValue, placeholder }) => {
  return (
    <Input
      value={value}
      onChangeText={(text) => setValue(text)}
      border={0}
      borderBottomWidth={1}
      borderBottomColor={propStyles.shadowedColor}
      w='100%'
      placeholder={placeholder}
      autoCapitalize='none'
    />
  );
};

export default InputUnderline;
