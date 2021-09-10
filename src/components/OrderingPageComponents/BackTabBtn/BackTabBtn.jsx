import React from 'react';

import { TouchableOpacity } from 'react-native';
import { Text, Center } from 'native-base';
import propStyles from '../../../resources/propStyles';

const BackTabBtn = ({ setTab, label }) => {
  return (
    <Center mt={3}>
      <TouchableOpacity
        onPress={() => setTab((prevTab) => prevTab - 1)}
        style={{
          alignItems: 'center',
          paddingTop: 4,
          borderBottomWidth: 1,
          borderBottomColor: propStyles.grayColor,
        }}
      >
        <Text fontSize={14} color={propStyles.grayColor}>
          {label}
        </Text>
      </TouchableOpacity>
    </Center>
  );
};

export default BackTabBtn;
