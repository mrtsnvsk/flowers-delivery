import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Center, Image, Actionsheet } from 'native-base';

import SearchFilterCarousel from '../../components/SearchPageComponents/SearchFilterCarousel';
import SearchFilterActionSheet from '../../components/SearchPageComponents/SearchFilterActionSheet';
import SearchItems from '../../components/SearchPageComponents/SearchItems/SearchItems';
import SpinnerFw from '../../components/Elements/SpinnerFw';

import { clearSearchImg } from '../../resources/images';
import {
  getSearchProductsList,
  updateSearchProductsTerm,
} from '../../store/actions/product';
import { getCategoriesList } from '../../store/actions/categories';
import useDebounce from '../../hooks/useDebounce';
import i18n from 'i18n-js';

const SearchPage = ({
  searchProductsList,
  loadingSearchProductsList,
  getSearchProductsList,
  searchProductsTerm,
  updateSearchProductsTerm,
  getCategoriesList,
  categoriesList,
}) => {
  const debouncedSearch = useDebounce(getSearchProductsList, 700);

  const [showActionsheet, setShowActionSheet] = useState(false);
  const [termCategory, setTermCategory] = useState(null);

  const characters = [
    {
      name: 'Красный',
    },
    {
      name: 'Синий',
    },
  ];

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  useEffect(() => {
    return () => {
      updateSearchProductsTerm('');
      setTermCategory(null);
    };
  }, []);

  useEffect(() => {
    const categoryId = termCategory?.id || null;

    debouncedSearch(
      searchProductsTerm?.trim()?.toLowerCase() || null,
      categoryId
    );
  }, [searchProductsTerm, termCategory]);

  if (loadingSearchProductsList) {
    return <SpinnerFw />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box bg='#fff' flex={1}>
        <SearchFilterCarousel
          termCategory={termCategory}
          setTermCategory={setTermCategory}
          openFilters={() => setShowActionSheet(true)}
        />
        {(!termCategory?.name && !searchProductsTerm) ||
        !searchProductsList.length ? (
          <Center flex={1}>
            <Image
              resizeMode='stretch'
              w={240}
              height={300}
              source={clearSearchImg}
              alt='Search Product'
            />
          </Center>
        ) : (
          <SearchItems products={searchProductsList} />
        )}
        <Actionsheet
          isOpen={showActionsheet}
          onClose={() => setShowActionSheet(false)}
        >
          <Actionsheet.Content alignItems='flex-start' p={'20px'} pt={0}>
            <SearchFilterActionSheet
              setTermCategory={setTermCategory}
              label={i18n.t('searchMenu')}
              items={categoriesList}
            />
            <SearchFilterActionSheet
              withFilters={true}
              setTermCategory={setTermCategory}
              label={i18n.t('searchCharacters')}
              items={characters}
            />
          </Actionsheet.Content>
        </Actionsheet>
      </Box>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = ({
  products: {
    searchProductsList,
    loadingSearchProductsList,
    searchProductsTerm,
  },
  categories: { categoriesList },
}) => ({
  searchProductsList,
  loadingSearchProductsList,
  searchProductsTerm,
  categoriesList,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchProductsList: (term, category) =>
    dispatch(getSearchProductsList(term, category)),
  updateSearchProductsTerm: (term) => dispatch(updateSearchProductsTerm(term)),
  getCategoriesList: () => dispatch(getCategoriesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
