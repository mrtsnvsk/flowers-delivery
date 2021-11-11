import React from 'react';

import { Box, Flex, Text } from 'native-base';
import DottedUnderline from '../../BasketPageComponents/DottedUnderline';

const OrderDetailLine = ({ text, count, price }) => {
  return (
    <Box mb={3}>
      <Flex direction='row' justify='space-between' align='center'>
        <Box>{text}</Box>
        <Flex direction='row' align='center'>
          {count === 0 || count ? (
            <Box mr={1}>
              <Text>x{count}</Text>
            </Box>
          ) : null}
          <Box>
            <Text>{price} p.</Text>
          </Box>
        </Flex>
      </Flex>
      <DottedUnderline />
    </Box>
  );
};

export default OrderDetailLine;
