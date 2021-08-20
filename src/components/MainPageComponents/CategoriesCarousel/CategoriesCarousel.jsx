import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, ScrollView, Flex } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import propStyles from '../../../resources/propStyles';

const CategoriesCarousel = () => {
  const navigation = useNavigation();

  const arr = ['Акции', 'Розы', 'Премиум', 'Цветы', 'Повод'];

  return (
    <Box>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {arr.map((el) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CatalogPage')}
            key={el}
            style={{
              marginRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Flex
              mb={2}
              key={el}
              alignItems='center'
              justifyContent='center'
              style={styles.categoryImg}
            >
              <MaterialCommunityIcons
                name='compass-rose'
                size={38}
                color={propStyles.mainRedColor}
              />
            </Flex>
            <Flex _text={{ fontSize: 12 }}>{el}</Flex>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  categoryImg: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 50,
    ...propStyles.shadowDefault,
  },
});

export default CategoriesCarousel;
