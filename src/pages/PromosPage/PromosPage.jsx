import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Box, ScrollView } from 'native-base';

import { getProductsWithStocks } from '../../store/actions/product';
import PromoItem from '../../components/PromosComponents/PromoItem';
import ProductItems from '../../components/CatalogPageComponents/ProductItems';

const PromosPage = ({ getProductsWithStocks, productsWithStocksList }) => {
  useEffect(() => {
    getProductsWithStocks();
  }, [getProductsWithStocks]);

  return (
    <Box flex={1}>
      <ScrollView>
        <ProductItems data={productsWithStocksList} />
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({ products: { productsWithStocksList } }) => ({
  productsWithStocksList,
});

const mapDispatchToProps = (dispatch) => ({
  getProductsWithStocks: () => dispatch(getProductsWithStocks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromosPage);
