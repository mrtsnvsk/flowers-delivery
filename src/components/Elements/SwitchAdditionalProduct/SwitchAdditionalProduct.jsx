import React from 'react';

import { Switch, Dimensions } from 'react-native';
import { Box, Flex, Image, Text } from 'native-base';

const { width } = Dimensions.get('window');

const SwitchAdditionalProduct = ({ item, matchItem, setAdded }) => {
  return (
    <Flex mb={2} direction='row' justify='space-between' align='center'>
      <Flex direction='row' align='center'>
        <Box mr={2}>
          <Image
            width={50}
            height={50}
            source={{ uri: item.image }}
            borderRadius={6}
            alt={item.name}
          />
        </Box>
        <Box width={width - 210}>
          <Text fontSize={13}>
            {item.name} + {item.price} руб.
          </Text>
        </Box>
      </Flex>
      <Box mr={1}>
        <Switch
          disabled={matchItem}
          onValueChange={() => setAdded(!item.added, item.id)}
          value={item.added}
        />
      </Box>
      <Box>
        <Text fontWeight='700' fontSize={14}>
          {item.price} p.
        </Text>
      </Box>
    </Flex>
  );
};

export default SwitchAdditionalProduct;
