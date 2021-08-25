import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Box, ScrollView } from 'native-base';

const { width } = Dimensions.get('window');

import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const CategoriesPage = () => {
  const navigation = useNavigation();

  const categories = [
    {
      id: 0,
      name: 'Акции',
      icon: <Ionicons name='rose' size={46} color={'#fff'} />,
    },
    {
      id: 1,
      name: 'Ароматная роза',
      icon: <Entypo name='flower' size={46} color={'#fff'} />,
    },
    {
      id: 2,
      name: 'Кустовая роза',
      icon: (
        <MaterialCommunityIcons
          name='flower-tulip-outline'
          size={46}
          color={'#fff'}
        />
      ),
    },
    {
      id: 3,
      name: 'Пионовидная роза',
      icon: (
        <MaterialCommunityIcons
          name='flower-outline'
          size={46}
          color={'#fff'}
        />
      ),
    },
  ];

  const onPushToLink = (el) => {
    navigation.navigate('CatalogPage', { name: el.name, id: el.id });
  };

  return (
    <Box p='20px' pb={0} safeAreaTop>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb={3} _text={styles.headerText}>
          Каталог
        </Box>
        {categories.map((el) => (
          <TouchableOpacity
            key={el.name}
            onPress={() => onPushToLink(el)}
            style={styles.categoryItem}
          >
            <Box _text={styles.categoryNameText}>{el.name}</Box>
            <Box>{el.icon}</Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontWeight: '500',
  },
  categoryItem: {
    borderRadius: 14,
    backgroundColor: '#000',
    width: width - 40,
    paddingHorizontal: 34,
    paddingVertical: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryNameText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default CategoriesPage;
