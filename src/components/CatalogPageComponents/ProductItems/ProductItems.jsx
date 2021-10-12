import React, { useState } from 'react';

import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Box, Flex, Text } from 'native-base';

import BuyBtn from '../../Elements/BuyBtn';
import ProductModal from '../../Modals/ProductModal';
import PromoPercent from '../../Elements/PromoPercent';

const { width } = Dimensions.get('window');

const ProductItems = ({ data }) => {
  const [isShowModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState({});

  const onOpenProductModal = (id) => {
    setProductId(id);
    setShowModal(true);
  };

  return (
    <>
      <Flex direction='row' justify='space-between' wrap='wrap' p='20px'>
        {data?.length
          ? data.map((el) => (
              <TouchableOpacity
                key={el.id}
                activeOpacity={0.6}
                onPress={() => onOpenProductModal(el.id)}
                style={styles.productItemWrap}
              >
                <ImageBackground
                  source={{ uri: el.image }}
                  style={styles.productImg}
                  imageStyle={{ borderRadius: 6 }}
                >
                  {el.promo && <PromoPercent promo={el.promo} />}
                </ImageBackground>
                <Box height={'34px'} mt={4}>
                  <Text
                    style={styles.productNameText}
                    ellipsizeMode={'tail'}
                    numberOfLines={2}
                  >
                    {el.name}
                  </Text>
                </Box>
                <Box mt={2}>
                  <Text
                    style={styles.productDescText}
                    ellipsizeMode={'tail'}
                    numberOfLines={3}
                  >
                    {el.description}
                  </Text>
                </Box>
                <Box mt={4}>
                  <BuyBtn price={el.price} />
                </Box>
              </TouchableOpacity>
            ))
          : null}
      </Flex>
      <ProductModal id={productId} open={isShowModal} setOpen={setShowModal} />
    </>
  );
};

const styles = StyleSheet.create({
  productItemWrap: {
    width: (width - 54) / 2,
    marginBottom: 16,
  },
  productImg: {
    width: (width - 54) / 2,
    height: (width - 54) / 2,
    position: 'relative',
  },
  productNameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  productDescText: {},
});

export default ProductItems;
