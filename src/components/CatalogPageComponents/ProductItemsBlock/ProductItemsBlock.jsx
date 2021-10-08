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

const ProductItemsBlock = ({ data }) => {
  const [isShowModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState({});

  const onOpenProductModal = (id) => {
    setProductId(id);
    setShowModal(true);
  };

  return (
    <>
      <Flex direction='row' justify='space-between' wrap='wrap' p='20px'>
        {data?.length &&
          data.map((el) => (
            <TouchableOpacity
              key={el.id}
              activeOpacity={0.6}
              onPress={() => onOpenProductModal(el.id)}
              style={styles.productItemWrap}
            >
              <ImageBackground
                source={{ uri: el.image }}
                style={styles.productImg}
                imageStyle={{ borderRadius: 14 }}
              >
                {el.promo && (
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
                      {String(el?.promo).length >= 2 ? (
                        <>
                          <Text
                            style={[
                              styles.promoText,
                              {
                                fontSize:
                                  el.promo >= 10 && el.promo <= 20 ? 16 : 14,
                              },
                            ]}
                          >
                            {el.promo?.toString().slice(0, 1)}
                          </Text>
                          <Text
                            style={[
                              styles.promoText,
                              {
                                fontSize:
                                  el.promo >= 10 && el.promo <= 20 ? 14 : 16,
                              },
                            ]}
                          >
                            {el.promo?.toString().slice(1)}%
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.promoText}>{el.promo}%</Text>
                      )}
                    </Text>
                  </Flex>
                )}
              </ImageBackground>
              <Box mt={4}>
                <Text
                  style={styles.productNameText}
                  ellipsizeMode={'tail'}
                  numberOfLines={2}
                >
                  {el.name}
                </Text>
              </Box>
              <Box mt={4}>
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
          ))}
      </Flex>
      <ProductModal id={productId} open={isShowModal} setOpen={setShowModal} />
    </>
  );
};

const styles = StyleSheet.create({
  productItemWrap: {
    width: '100%',
    marginBottom: 16,
  },
  productImg: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  productNameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  productDescText: {},
  promoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductItemsBlock;
