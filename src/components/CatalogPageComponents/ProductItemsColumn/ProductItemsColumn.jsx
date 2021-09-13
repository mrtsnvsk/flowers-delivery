import React, { useState } from 'react';

import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Box, Flex, Text } from 'native-base';
import ProductModal from '../../Modals/ProductModal';

const { width } = Dimensions.get('window');

const ProductItemsColumn = ({ data }) => {
  const [isProduct, setProduct] = useState({});
  const [isShowModal, setShowModal] = useState(false);

  const openProductModal = (item) => {
    setProduct(item);
    setShowModal(true);
  };

  return (
    <>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => openProductModal(item)}
          style={styles.item}
        >
          <Flex direction='row' alignItems='center'>
            <ImageBackground
              style={styles.productImg}
              source={{ uri: item.img }}
              imageStyle={{ borderRadius: 14 }}
            >
              {item.promo && (
                <Flex
                  alignItems='center'
                  justify='center'
                  width={52}
                  height={30}
                  bgColor='#FF451D'
                  position='absolute'
                  top={0}
                  left={0}
                  borderBottomRightRadius={14}
                  borderTopLeftRadius={14}
                >
                  <Text>
                    {String(item?.promo).length >= 2 ? (
                      <>
                        <Text
                          style={[
                            styles.promoText,
                            {
                              fontSize:
                                item.promo >= 10 && item.promo <= 20 ? 16 : 14,
                            },
                          ]}
                        >
                          {item.promo?.toString().slice(0, 1)}
                        </Text>
                        <Text
                          style={[
                            styles.promoText,
                            {
                              fontSize:
                                item.promo >= 10 && item.promo <= 20 ? 14 : 16,
                            },
                          ]}
                        >
                          {item.promo?.toString().slice(1)}%
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.promoText}>{item.promo}%</Text>
                    )}
                  </Text>
                </Flex>
              )}
            </ImageBackground>
            <Box>
              <Box>
                <Text
                  style={{ width: width - 180 }}
                  ellipsizeMode={'tail'}
                  numberOfLines={3}
                  color='#000'
                  fontSize={18}
                  fontWeight='600'
                >
                  {item.name}
                </Text>
              </Box>
              <Flex direction='row' mt={3}>
                <Text fontWeight='600' fontSize={15}>
                  {item.price.toFixed(2)} p.
                </Text>
              </Flex>
            </Box>
          </Flex>
        </TouchableOpacity>
      ))}
      <ProductModal
        product={isProduct}
        open={isShowModal}
        setOpen={setShowModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 14,
    borderRadius: 14,
    marginHorizontal: 14,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  productImg: {
    marginRight: 14,
    width: 120,
    height: 120,
    position: 'relative',
  },
  productNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
  promoText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ProductItemsColumn;
