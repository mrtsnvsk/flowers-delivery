import React from 'react';

import { Switch, Dimensions } from 'react-native';
import { Box, Flex, Image, Text } from 'native-base';

const { width } = Dimensions.get('window');

const SwitchAdditionalProduct = ({ value, setValue, matchItem }) => {
  const img = 'https://aggeek.net/files/blog/apple.1140x600.jpg';

  return (
    <Flex direction='row' justify='space-between' align='center'>
      <Flex direction='row' align='center'>
        <Box mr={2}>
          <Image
            width={50}
            height={50}
            source={{ uri: img }}
            borderRadius={6}
            alt='Additional product'
          />
        </Box>
        <Box width={width - 210}>
          <Text fontSize={14}>Добавить в упаковку + 250 руб.</Text>
        </Box>
      </Flex>
      <Box mr={1}>
        <Switch
          disabled={matchItem}
          onValueChange={() => setValue((prev) => !prev)}
          value={value}
        />
      </Box>
      <Box>
        <Text fontWeight='700' fontSize={14}>
          +250 p.
        </Text>
      </Box>
    </Flex>
  );
};

export default SwitchAdditionalProduct;
