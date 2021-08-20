import React from 'react';

import { TouchableOpacity } from 'react-native';
import { Flex } from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const CatalogHeader = () => {
  return (
    <Flex direction='row' justify='space-between' alignItems='center'>
      <TouchableOpacity style={{ paddingRight: 20 }}>
        <MaterialIcons name='sort' size={24} color='black' />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name='filter' size={24} color='black' />
      </TouchableOpacity>
    </Flex>
  );
};

export default CatalogHeader;
