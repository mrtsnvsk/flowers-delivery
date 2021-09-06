import React from 'react';

import { TouchableOpacity, Linking } from 'react-native';
import { Box, Flex } from 'native-base';
import propStyles from '../../../resources/propStyles';
import { Feather } from '@expo/vector-icons';

const CallPhoneBlock = () => {
  const phone = '+7 (812) 445-12-13';

  return (
    <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
      <Flex direction='row' alignItems='center'>
        <Flex
          mr={4}
          p={2}
          bgColor={propStyles.mainRedColor}
          borderRadius={50}
          alignItems='center'
          justify='center'
        >
          <Feather name='phone' size={24} color={'#fff'} />
        </Flex>
        <Box>
          <Box _text={{ fontWeight: '500' }}>{phone}</Box>
          <Box
            mt={1}
            _text={{ color: propStyles.blueActiveColor, fontSize: 14 }}
          >
            Позвонить
          </Box>
        </Box>
      </Flex>
    </TouchableOpacity>
  );
};

export default CallPhoneBlock;
