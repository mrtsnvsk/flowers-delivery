import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';

const HeaderBackBtn = ({ navigation }) => {
  return (
    <Ionicons
      onPress={() => navigation.goBack()}
      name='chevron-back'
      size={24}
      color={propStyles.shadowColor}
    />
  );
};

export default HeaderBackBtn;
