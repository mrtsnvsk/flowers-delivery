import React, { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Box, ScrollView, Image } from 'native-base';

import SpinnerFw from '../../components/Elements/SpinnerFw';

const { width } = Dimensions.get('window');

import { getCategoriesList } from '../../store/actions/categories';

const CategoriesPage = ({
  categoriesList,
  getCategoriesList,
  loadingCategoriesList,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  const onPushToLink = useCallback((el) => {
    navigation.navigate('CatalogPage', { name: el.name, id: el.id });
  }, []);

  if (loadingCategoriesList) {
    return <SpinnerFw />;
  }

  return (
    <Box flex={1} p='20px' pb={0} safeAreaTop>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb={3} _text={styles.headerText}>
          Каталог
        </Box>
        {categoriesList.length
          ? categoriesList.map((el) => (
              <TouchableOpacity
                onPress={() => onPushToLink(el)}
                activeOpacity={0.6}
                key={el.id}
                style={styles.categoryItem}
              >
                <Box _text={styles.categoryNameText}>{el.name}</Box>
                <Image
                  borderRadius={8}
                  w={46}
                  h={46}
                  source={{ uri: el.image }}
                  alt={el.name}
                />
              </TouchableOpacity>
            ))
          : null}
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

const mapStateToProps = ({
  categories: { categoriesList, loadingCategoriesList },
}) => ({
  categoriesList,
  loadingCategoriesList,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoriesList: () => dispatch(getCategoriesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
