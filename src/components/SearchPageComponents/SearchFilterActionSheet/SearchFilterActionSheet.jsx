import React, { useState } from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Flex, ScrollView, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

const SearchFilterActionSheet = ({
  withFilters,
  items,
  label,
  setTermCategory,
}) => {
  const [isChar, setChar] = useState(0);

  const tabs = [
    {
      id: 0,
      name: 'цвет',
      filters: [
        {
          id: 0,
          name: 'Красный',
        },
        {
          id: 1,
          name: 'Синий',
        },
      ],
    },
    {
      id: 1,
      name: 'количество цветов в букете',
      filters: [
        {
          id: 0,
          name: '11 цветов',
        },
        {
          id: 1,
          name: '13 цветов',
        },
      ],
    },
    {
      id: 2,
      name: 'размер',
      filters: [
        {
          id: 0,
          name: 'Большой',
        },
        {
          id: 1,
          name: 'Маленький',
        },
      ],
    },
  ];

  return (
    <>
      <Box _text={styles.labelText} mb={5}>
        {label}
      </Box>
      {withFilters && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab, i) => (
            <Flex
              key={tab.id}
              mr='20px'
              py='12px'
              direction='row'
              alignItems='center'
            >
              <TouchableOpacity
                onPress={() => setChar(i)}
                style={{ paddingRight: 20 }}
              >
                <Text
                  color={
                    isChar === i
                      ? propStyles.mainRedColor
                      : propStyles.grayColor
                  }
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
              <Box>
                <Text color={propStyles.grayColor}>|</Text>
              </Box>
            </Flex>
          ))}
        </ScrollView>
      )}
      <ScrollView mb={5} horizontal showsHorizontalScrollIndicator={false}>
        {!withFilters
          ? items.map((el) => (
              <TouchableOpacity
                onPress={() => setTermCategory({ name: el.name, id: el.id })}
                key={el.id}
                style={styles.filterBtn}
              >
                <Text style={styles.filterBtnText}>{el.name}</Text>
              </TouchableOpacity>
            ))
          : tabs[isChar].filters.map((filter, i) => (
              <TouchableOpacity
                onPress={() => setTermCategory({ name: filter.name, id: i })}
                key={i}
                style={styles.filterBtn}
              >
                <Text style={styles.filterBtnText}>{filter.name}</Text>
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
    borderRadius: 6,
  },
  filterBtnText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SearchFilterActionSheet;
