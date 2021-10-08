import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Center, Image, Actionsheet } from 'native-base';

import SearchFilterCarousel from '../../components/SearchPageComponents/SearchFilterCarousel';

import { clearSearchImg } from '../../resources/images';
import SearchFilterActionSheet from '../../components/SearchPageComponents/SearchFilterActionSheet';
import SearchItems from '../../components/SearchPageComponents/SearchItems/SearchItems';

import {
  getSearchProductsList,
  updateSearchProductsTerm,
} from '../../store/actions/product';
import useDebounce from '../../hooks/useDebounce';
import SpinnerFw from '../../components/Elements/SpinnerFw';

const SearchPage = ({
  searchProductsList,
  loadingSearchProductsList,
  getSearchProductsList,
  searchProductsTerm,
  updateSearchProductsTerm,
}) => {
  const debouncedSearch = useDebounce(getSearchProductsList, 1000);

  const [showActionsheet, setShowActionSheet] = useState(false);
  const [termCategory, setTermCategory] = useState(null);

  const menu = [
    {
      name: 'Акции',
    },
    {
      name: 'Розы',
    },
    {
      name: 'Цветы',
    },
    {
      name: 'Вазы',
    },
  ];

  const characters = [
    {
      name: 'Красный',
    },
    {
      name: 'Синий',
    },
  ];

  useEffect(() => {
    return () => {
      updateSearchProductsTerm('');
    };
  }, []);

  useEffect(() => {
    if (searchProductsTerm) {
      debouncedSearch(searchProductsTerm);
    } else {
      getSearchProductsList('');
    }
  }, [searchProductsTerm]);

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
              alt='Поиск товаров'
            />
          </Center>
        ) : (
          <SearchItems products={searchProductsList} />
        )}

        <Actionsheet
          isOpen={showActionsheet}
          onClose={() => setShowActionSheet(false)}
        >
          <Actionsheet.Content alignItems='flex-start' px={'20px'} pb={'20px'}>
            <SearchFilterActionSheet
              setTermCategory={setTermCategory}
              label={'Меню'}
              items={menu}
            />
            <SearchFilterActionSheet
              withFilters={true}
              setTermCategory={setTermCategory}
              label={'Характеристики'}
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
}) => ({
  searchProductsList,
  loadingSearchProductsList,
  searchProductsTerm,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchProductsList: (term) => dispatch(getSearchProductsList(term)),
  updateSearchProductsTerm: (term) => dispatch(updateSearchProductsTerm(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
