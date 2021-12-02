import React, { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, ScrollView, Flex, Text, Image } from 'native-base';

import propStyles from '../../../resources/propStyles';

import { getCategoriesList } from '../../../store/actions/categories';

const CategoriesCarousel = ({ getCategoriesList, categoriesList }) => {
  const navigation = useNavigation();

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  const onPushToLink = useCallback((el) => {
    navigation.navigate('CatalogPage', { name: el.name, id: el.id });
  }, []);

  return (
    <Box>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categoriesList.map((el) => (
          <TouchableOpacity
            onPress={() => onPushToLink(el)}
            key={el.id}
            style={{
              width: 70,
              marginRight: 10,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Flex
              mb={2}
              alignItems='center'
              justifyContent='center'
              style={styles.categoryImg}
            >
              <Image
                source={{ uri: el.image }}
                alt={el.name}
                w={47}
                h={47}
                borderRadius={50}
              />
            </Flex>
            <Flex>
              <Text textAlign='center' numberOfLines={2} fontSize={11}>
                {el.name}
              </Text>
            </Flex>
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

const mapStateToProps = ({ categories: { categoriesList } }) => ({
  categoriesList,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoriesList: () => dispatch(getCategoriesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesCarousel);
