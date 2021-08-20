import React from 'react';

import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Box, Actionsheet, ScrollView, Text } from 'native-base';

const SearchFilterActionSheet = ({ items, label, setTermCategory }) => {
  return (
    <>
      <Box _text={styles.labelText} mb={5}>
        {label}
      </Box>
      <ScrollView mb={5} horizontal showsHorizontalScrollIndicator={false}>
        {items.map((el, i) => (
          <TouchableOpacity
            onPress={() => setTermCategory({ name: el.name, id: i })}
            key={i}
            style={styles.filterBtn}
          >
            <Text style={styles.filterBtnText}>{el.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 14,
    borderRadius: 8,
  },
  filterBtnText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SearchFilterActionSheet;
