import React from 'react';

import { Box, Flex, Text } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import propStyles from '../../../resources/propStyles';
import { Entypo } from '@expo/vector-icons';

const rightChevron = (
  <Entypo name='chevron-right' size={24} color={propStyles.grayColor} />
);

const ListItem = ({
  text,
  chevron = rightChevron,
  icon,
  noBorder,
  actionFn,
}) => {
  return (
    <TouchableOpacity
      onPress={actionFn}
      style={[
        styles.listItem,
        {
          borderTopWidth: noBorder ? 0 : 1,
          paddingVertical: noBorder ? 0 : 12,
        },
      ]}
    >
      <Flex direction='row' align='center'>
        <Box p={'5px'} mr={4}>
          {icon}
        </Box>
        <Box>
          <Text>{text}</Text>
        </Box>
      </Flex>
      <Box>{chevron}</Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: propStyles.shadowColor,
  },
});

export default ListItem;
