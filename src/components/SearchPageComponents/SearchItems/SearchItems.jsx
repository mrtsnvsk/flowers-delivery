import React, { useState } from 'react';

import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Box, ScrollView, Image, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

import ProductModal from '../../Modals/ProductModal';

const { width } = Dimensions.get('window');

const SearchItems = ({ products }) => {
  const [isShowModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(false);

  const onOpenProductModal = (el) => {
    setProduct(el);
    setShowModal(true);
  };

  return (
    <>
      <Box p='20px'>
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.length
            ? products.map((el) => (
                <TouchableOpacity
                  onPress={() => onOpenProductModal(el)}
                  style={styles.productItem}
                >
                  <Box mr='20px'>
                    <Image
                      resizeMode='stretch'
                      width={78}
                      height={78}
                      alt={el.name}
                      source={{ uri: el.img }}
                      borderRadius={14}
                    />
                  </Box>
                  <Box>
                    <Box width={width - 158} mb={3}>
                      <Text
                        color='#000'
                        fontSize={18}
                        fontWeight='600'
                        ellipsizeMode='tail'
                        numberOfLines={2}
                      >
                        {el.name}
                      </Text>
                    </Box>
                    <Box>
                      <Text color={propStyles.grayColor}>
                        {el.price.toFixed(2)} p.
                      </Text>
                    </Box>
                  </Box>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
      </Box>
      <ProductModal
        open={isShowModal}
        setOpen={setShowModal}
        product={product}
      />
    </>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
});

export default SearchItems;
