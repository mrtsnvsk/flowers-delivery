import React from 'react';

import { Dimensions } from 'react-native';
import { Box, Text, Flex, Image } from 'native-base';

const { width } = Dimensions.get('window');

const OrderingItem = ({ item }) => {
  return (
    <Box shadow={3} borderRadius={14} mb={4} bg='#fff'>
      <Box p='14px'>
        <Flex direction='row' alignItems='center'>
          <Box mr={'14px'}>
            <Image
              borderRadius={14}
              width={100}
              height={100}
              source={{ uri: item.images[0].url }}
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
                {item.name}
              </Text>
            </Box>
            <Flex direction='row' mt={3}>
              <Text fontWeight='600' fontSize={15}>
                {item.price.toFixed(2)} p.
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default OrderingItem;
