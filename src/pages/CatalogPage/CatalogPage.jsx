import React, { useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import { Box, ScrollView } from 'native-base';

import CatalogCategoriesCarousel from '../../components/CatalogPageComponents/CatalogCategoriesCarousel/CatalogCategoriesCarousel';
import ProductItems from '../../components/CatalogPageComponents/ProductItems';
import BasketBottomLink from '../../components/Elements/BasketBottomLink';
import SortModal from '../../components/Modals/SortModal';
import ProductItemsColumn from '../../components/CatalogPageComponents/ProductItemsColumn';
import ProductItemsBlock from '../../components/CatalogPageComponents/ProductItemsBlock';

import { showSortModal } from '../../store/actions/modals';
import { getCatalogBlockLayout } from '../../store/actions/catalogLayout';

import {
  getProductsList,
  updateSortProductsOrder,
  updateProductsList,
} from '../../store/actions/product';
import SpinnerFw from '../../components/Elements/SpinnerFw';
import { Text } from 'react-native-svg';

const CatalogPage = ({
  route,
  isShowSortModal,
  showSortModal,
  catalogLayout,
  getCatalogBlockLayout,
  getProductsList,
  loadingProductsList,
  productsList,
  orderSortProducts,
  updateSortProductsOrder,
  updateProductsList,
  productPriceFrom,
  productPriceTo,
}) => {
  const { name, id } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    if (name) {
      navigation.setOptions({ headerTitle: name });
    }
  }, [name]);

  useEffect(() => {
    getCatalogBlockLayout();
  }, [getCatalogBlockLayout]);

  useEffect(() => {
    getProductsList(id, orderSortProducts);
  }, [id, orderSortProducts, productPriceFrom, productPriceTo]);

  useEffect(() => {
    return () => {
      updateProductsList([]);
    };
  }, []);

  return (
    <>
      <Box flex={1}>
        <CatalogCategoriesCarousel />
        {loadingProductsList ? (
          <SpinnerFw />
        ) : (
          <ScrollView>
            {catalogLayout === 'row' ? (
              <ProductItems data={productsList} />
            ) : catalogLayout === 'list' ? (
              <ProductItemsColumn data={productsList} />
            ) : catalogLayout === 'block' ? (
              <ProductItemsBlock data={productsList} />
            ) : null}
          </ScrollView>
        )}
      </Box>
      <BasketBottomLink bottom={0} />
      <SortModal
        orderPrice={orderSortProducts}
        setOrderPrice={updateSortProductsOrder}
        open={isShowSortModal}
        setOpen={showSortModal}
      />
    </>
  );
};

const mapStateToProps = ({
  modals: { isShowSortModal },
  catalogLayout: { catalogLayout },
  products: {
    loadingProductsList,
    productsList,
    orderSortProducts,
    productPriceFrom,
    productPriceTo,
  },
}) => ({
  isShowSortModal,
  catalogLayout,
  loadingProductsList,
  productsList,
  orderSortProducts,
  productPriceFrom,
  productPriceTo,
});

const mapDispatchToProps = (dispatch) => ({
  showSortModal: (bool) => dispatch(showSortModal(bool)),
  getCatalogBlockLayout: () => dispatch(getCatalogBlockLayout()),
  getProductsList: (id, order) => dispatch(getProductsList(id, order)),
  updateSortProductsOrder: (order) => dispatch(updateSortProductsOrder(order)),
  updateProductsList: (list) => dispatch(updateProductsList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
