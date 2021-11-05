import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, ScrollView, Flex, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';
import i18n from 'i18n-js';

const SearchFilterCarousel = ({
  openFilters,
  termCategory,
  setTermCategory,
}) => {
  return (
    <Box p={'20px'}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={openFilters} style={styles.filterBtn}>
          <Box mr={3}>
            <Ionicons name='add' size={20} color={'rgba(0, 0, 0, 0.5)'} />
          </Box>
          <Box _text={styles.filterBtnText}>{i18n.t('searchFilterButton')}</Box>
        </TouchableOpacity>
        {termCategory ? (
          <Box style={styles.filterBtn}>
            <Box mr={3}>
              <Text
                style={[
                  styles.filterBtnText,
                  { color: propStyles.mainRedColor },
                ]}
              >
                {termCategory?.name}
              </Text>
            </Box>
            <TouchableOpacity onPress={() => setTermCategory(null)}>
              <Ionicons
                name='close-circle'
                size={20}
                color={propStyles.mainRedColor}
              />
            </TouchableOpacity>
          </Box>
        ) : null}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f1f1f1',
    marginRight: 14,
    borderRadius: 6,
  },
  filterBtnText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SearchFilterCarousel;
