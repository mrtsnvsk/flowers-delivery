import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Box, ScrollView, Image, Text } from 'native-base';
import BuyBtn from '../../Elements/BuyBtn';

const { width } = Dimensions.get('window');

import { getProductsWithStocks } from '../../../store/actions/product';
import BlockHeader from '../../MainPageComponents/BlockHeader';
import PromoPercent from '../../Elements/PromoPercent';
import ProductModal from '../../Modals/ProductModal';

const PromoItem = ({ getProductsWithStocks, productsWithStocksList }) => {
  const [isShowModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState({});

  useEffect(() => {
    getProductsWithStocks();
  }, [getProductsWithStocks]);

  const onOpenProductModal = (id) => {
    setProductId(id);
    setShowModal(true);
  };

  return (
    <>
      {productsWithStocksList?.length ? (
        <Box>
          <BlockHeader label={'Акции'} />
          <Box pl='20px'>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {productsWithStocksList.map((el, i) => (
                <TouchableOpacity
                  onPress={() => onOpenProductModal(el.id)}
                  activeOpacity={0.5}
                  style={styles.container}
                  key={i}
                >
                  <ImageBackground
                    source={{ uri: el.image }}
                    style={styles.productImg}
                    alt='Product'
                    imageStyle={{ borderRadius: 14 }}
                  >
                    <PromoPercent promo={Math.ceil(el.percent_stock)} />
                  </ImageBackground>
                  <Box mt={1}>
                    <Text
                      ellipsizeMode={'clip'}
                      numberOfLines={1}
                      style={styles.productNameText}
                    >
                      {el.name}
                    </Text>
                  </Box>
                  <Box mt={4}>
                    <BuyBtn price={el.stock} />
                  </Box>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Box>
        </Box>
      ) : null}
      <ProductModal id={productId} open={isShowModal} setOpen={setShowModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - 40) / 2.4,
    marginRight: 13,
    position: 'relative',
  },
  productImg: {
    width: (width - 40) / 2.4,
    height: (width - 40) / 2.4,
  },
  productNameText: {
    fontWeight: '500',
  },
});

const mapStateToProps = ({ products: { productsWithStocksList } }) => ({
  productsWithStocksList,
});

const mapDispatchToProps = (dispatch) => ({
  getProductsWithStocks: () => dispatch(getProductsWithStocks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromoItem);
