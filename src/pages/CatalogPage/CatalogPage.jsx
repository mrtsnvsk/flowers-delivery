import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import { Box, ScrollView } from 'native-base';

import CatalogCategoriesCarousel from '../../components/CatalogPageComponents/CatalogCategoriesCarousel/CatalogCategoriesCarousel';
import ProductItems from '../../components/CatalogPageComponents/ProductItems';
import BasketBottomLink from '../../components/Elements/BasketBottomLink';
import SortModal from '../../components/Modals/SortModal';

import { showSortModal } from '../../store/actions/modals';

const CatalogPage = ({ route, isShowSortModal, showSortModal }) => {
  const { name, id } = route.params;
  const navigation = useNavigation();

  const img = 'https://tea-rose.com.ua/img/products/1598341880_70427.JPG';
  let idx = 0;
  const arr = [
    {
      id: idx++,
      img,
      name: 'Букет из 25 кустовых пионовидных роз Sweet',
      desc: 'Букет из 25 кустовых пионовидных роз сорта Sweet Flow нежно-розового цвета.',
      price: 2400,
      promo: 36,
    },
    {
      id: idx++,
      img,
      name: 'Букет из 11 кустовых пионовидных роз Sweet',
      desc: 'Букет из 11 кустовых пионовидных роз сорта Sweet Flow нежно-розового цвета.',
      price: 1200,
      promo: 19,
    },
    {
      id: idx++,
      img,
      name: 'Букет из 101 кустовых пионовидных роз Sweet',
      desc: 'Букет из 101 кустовых пионовидных роз сорта Sweet Flow нежно-розового цвета.',
      price: 5000,
      promo: 5,
    },
    {
      id: idx++,
      img,
      name: 'Букет из 13 кустовых пионовидных роз Sweet',
      desc: 'Букет из 13 кустовых пионовидных роз сорта Sweet Flow нежно-розового цвета.',
      price: 1300,
      promo: null,
    },
  ];

  useEffect(() => {
    if (name) {
      navigation.setOptions({ headerTitle: name });
    }
  }, [name]);

  return (
    <>
      <Box pb='60px'>
        <CatalogCategoriesCarousel />
        <ScrollView>
          <ProductItems data={arr} />
        </ScrollView>
      </Box>
      <BasketBottomLink bottom={0} />
      <SortModal open={isShowSortModal} setOpen={showSortModal} />
    </>
  );
};

const mapStateToProps = ({ modals: { isShowSortModal } }) => ({
  isShowSortModal,
});

const mapDispatchToProps = (dispatch) => ({
  showSortModal: (bool) => dispatch(showSortModal(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
