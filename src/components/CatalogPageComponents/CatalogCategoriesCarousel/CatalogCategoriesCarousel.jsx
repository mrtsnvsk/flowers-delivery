import React, { useState } from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, ScrollView, Text } from 'native-base';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import propStyles from '../../../resources/propStyles';

const CatalogCategoriesCarousel = () => {
  const categories = [
    {
      id: 0,
      name: 'Акции',
      icon: (color) => <Ionicons name='rose' size={24} color={color} />,
    },
    {
      id: 1,
      name: 'Ароматная роза',
      icon: (color) => <Entypo name='flower' size={24} color={color} />,
    },
    {
      id: 2,
      name: 'Кустовая роза',
      icon: (color) => (
        <MaterialCommunityIcons
          name='flower-tulip-outline'
          size={24}
          color={color}
        />
      ),
    },
    {
      id: 3,
      name: 'Пионовидная роза',
      icon: (color) => (
        <MaterialCommunityIcons name='flower-outline' size={24} color={color} />
      ),
    },
  ];

  const [isCurCategory, setCurCategory] = useState(0);

  return (
    <Box my={4}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories?.length
          ? categories.map((el, i) => (
              <TouchableOpacity
                onPress={() => setCurCategory(el.id)}
                key={i}
                style={{
                  ...styles.categoryItem,
                  backgroundColor:
                    isCurCategory === el.id ? propStyles.mainRedColor : '#fff',
                  marginLeft: i === 0 ? 20 : 12,
                }}
              >
                <Box mr={4}>
                  {el.icon(
                    isCurCategory === el.id ? '#fff' : propStyles.mainRedColor
                  )}
                </Box>
                <Box>
                  <Text
                    style={{
                      color:
                        isCurCategory === el.id
                          ? '#fff'
                          : propStyles.mainRedColor,
                    }}
                  >
                    {el.name}
                  </Text>
                </Box>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 14,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: '#fff',
    fontWeight: '500',
  },
});

export default CatalogCategoriesCarousel;
