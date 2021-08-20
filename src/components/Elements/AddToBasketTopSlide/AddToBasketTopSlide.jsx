import React from 'react';

import { Box, Flex, Slide, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import propStyles from '../../../resources/propStyles';

const AddToBasketTopSlide = ({ open, productName }) => {
  return (
    <Slide in={open} placement='top'>
      <Flex
        px='20px'
        py='30px'
        safeAreaTop
        bg={propStyles.redColor}
        direction='row'
        alignItems='center'
        borderBottomLeftRadius={14}
        borderBottomRightRadius={14}
      >
        <Box mr='20px'>
          <AntDesign name='check' size={24} color={'#fff'} />
        </Box>
        <Box pr='20px'>
          <Box>
            <Text mr='20px' color='#fff' fontSize={19} fontWeight='600'>
              {productName}
            </Text>
          </Box>
          <Box
            _text={{ color: '#fff', fontWeight: '400', fontSize: 17 }}
            mt={3}
          >
            Были добавлены в вашу корзину
          </Box>
        </Box>
      </Flex>
    </Slide>
  );
};

export default AddToBasketTopSlide;
