import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Box, Image, Center, Text, ScrollView } from 'native-base';

import { clearFavoritesListImg } from '../../resources/images';
import propStyles from '../../resources/propStyles';
import ProductItems from '../../components/CatalogPageComponents/ProductItems';

import { getFavoritesList } from '../../store/actions/favorites';
import SpinnerFw from '../../components/Elements/SpinnerFw';

const { width } = Dimensions.get('window');

const FavoritesPage = ({
  getFavoritesList,
  favoritesList,
  loadingFavoritesList,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    getFavoritesList();
  }, []);

  if (loadingFavoritesList) {
    return <SpinnerFw />;
  }

  const onPushToLink = (link) => {
    navigation.navigate(link);
  };

  return (
    <>
      {favoritesList.length ? (
        <Box flex={1}>
          <ScrollView>
            <ProductItems data={favoritesList} />
          </ScrollView>
        </Box>
      ) : (
        <Center bg='#fff' flex={1} p='40px'>
          <Box>
            <Image
              w={140}
              height={140}
              source={clearFavoritesListImg}
              alt='Heart'
            />
          </Box>
          <Box mt={3}>
            <Text fontSize={18} fontWeight='600'>
              Избранных пока нет
            </Text>
          </Box>
          <Box mt={3}>
            <Text textAlign='center'>
              Нажмите на сердце рядом с товаром, чтобы выбрать его.
            </Text>
          </Box>
          <Box shadow={4} mt={'30px'}>
            <TouchableOpacity
              onPress={() => onPushToLink('CategoriesPage')}
              style={[styles.btn, { backgroundColor: '#E51234' }]}
            >
              <Text color='#fff' fontSize={18} fontWeight='500'>
                Начните делать покупки
              </Text>
            </TouchableOpacity>
          </Box>
          <Box shadow={4} mt={5}>
            <TouchableOpacity
              onPress={() => onPushToLink('SearchPage')}
              style={[styles.btn, { backgroundColor: '#EDEDEE' }]}
            >
              <Text color={propStyles.grayColor} fontSize={18} fontWeight='500'>
                Поиск товаров
              </Text>
            </TouchableOpacity>
          </Box>
        </Center>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    paddingVertical: 14,
    width: width - 80,
    borderRadius: 3,
  },
});

const mapStateToProps = ({
  favorites: { favoritesList, loadingFavoritesList },
}) => ({
  favoritesList,
  loadingFavoritesList,
});

const mapDispatchToProps = (dispatch) => ({
  getFavoritesList: () => dispatch(getFavoritesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
