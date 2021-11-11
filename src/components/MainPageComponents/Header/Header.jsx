import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Flex, Image } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';
import { florcatLogo } from '../../../resources/images';

const Header = () => {
  const navigation = useNavigation();

  return (
    <Flex
      mt={1}
      pb={4}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Entypo name='menu' size={24} color={propStyles.mainRedColor} />
      </TouchableOpacity>
      <Box>
        <Image width={200} height={74} source={florcatLogo} alt='Logo' />
      </Box>
      <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
        <Ionicons name='search' size={24} color={propStyles.mainRedColor} />
      </TouchableOpacity>
    </Flex>
  );
};

export default Header;
