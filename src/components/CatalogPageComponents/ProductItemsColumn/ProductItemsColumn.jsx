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
  const [isShowModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState({});

  const openProductModal = (id) => {
    setProductId(id);
    setShowModal(true);
  };

  return (
    <>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => openProductModal(item.id)}
          style={styles.item}
        >
          <Flex direction='row'>
            <ImageBackground
              style={styles.productImg}
              source={{ uri: item.image }}
              imageStyle={{ borderRadius: 6 }}
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
                  borderBottomRightRadius={6}
                  borderTopLeftRadius={6}
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
            <Flex
              py={1}
              w={width - 180}
              direction='column'
              justify='space-between'
            >
              <Box>
                <Box>
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={3}
                    color='#000'
                    fontSize={18}
                    fontWeight='600'
                  >
                    {item.name}
                  </Text>
                </Box>
                <Box mt={1}>
                  <Text numberOfLines={2}>{item.description}</Text>
                </Box>
              </Box>
              <Box>
                <Text fontWeight='600' fontSize={15}>
                  {+item.price} p.
                </Text>
              </Box>
            </Flex>
          </Flex>
        </TouchableOpacity>
      ))}
      <ProductModal id={productId} open={isShowModal} setOpen={setShowModal} />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 14,
    borderRadius: 6,
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
