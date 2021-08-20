import React from 'react';

import { Dimensions, TouchableOpacity } from 'react-native';
import { Flex, Box, Image, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';
import BasketCountBtns from '../BasketCountBtns';

const { width } = Dimensions.get('window');

const BasketItem = () => {
  const img =
    'https://flox.com.ua/wp-content/uploads/2018/12/tsvety-v-korobke-nikol.jpg';

  return (
    <Box borderRadius={14} mb={4} bg='#fff'>
      <Box p='14px' mb={4}>
        <Flex alignItems='flex-end'>
          <TouchableOpacity>
            <AntDesign name='close' size={18} color={propStyles.shadowColor} />
          </TouchableOpacity>
        </Flex>
        <Flex direction='row' alignItems='center'>
          <Box mr={'14px'}>
            <Image
              borderRadius={14}
              width={100}
              height={100}
              source={{ uri: img }}
              alt='Product'
            />
          </Box>
          <Box>
            <Box>
              <Text
                style={{ width: width - 180 }}
                ellipsizeMode={'tail'}
                numberOfLines={3}
                color='#000'
                fontSize={18}
                fontWeight='600'
              >
                Букет из 51 красной розы
              </Text>
            </Box>
            <Flex direction='row' mt={3}>
              <Text
                mr={2}
                style={{
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                }}
                fontWeight='500'
                fontSize={14}
                color={propStyles.mainRedColor}
              >
                2390,00 p.
              </Text>
              <Text fontWeight='600' fontSize={15}>
                2390,00 p.
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Flex
        borderTopWidth={1}
        borderTopColor={propStyles.shadowColor}
        p='14px'
        direction='row'
        alignItems='center'
        justify='space-between'
      >
        <Flex direction='row' alignItems='center'>
          <Box mr={'24px'} _text={{ fontWeight: '600' }}>
            Всего за товар:
          </Box>
          <BasketCountBtns count={1} />
        </Flex>

        <Box>
          <Text fontWeight='600'>2390,00 p.</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default BasketItem;
