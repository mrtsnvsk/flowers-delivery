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

const { width } = Dimensions.get('window');

const ProductItems = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [isProduct, setProduct] = useState({});

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

  const onOpenProductModal = (el) => {
    setProduct(el);
    setShowModal(true);
  };

  return (
    <>
      <Flex direction='row' justify='space-between' wrap='wrap' p='20px'>
        {arr?.length &&
          arr.map((el) => (
            <TouchableOpacity
              key={el.id}
              activeOpacity={0.6}
              onPress={() => onOpenProductModal(el)}
              style={styles.productItemWrap}
            >
              <ImageBackground
                source={{ uri: img }}
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
                  {el.desc}
                </Text>
              </Box>
              <Box mt={4}>
                <BuyBtn price={el.price} />
              </Box>
            </TouchableOpacity>
          ))}
      </Flex>
      <ProductModal
        product={isProduct}
        open={isShowModal}
        setOpen={setShowModal}
      />
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
    fontWeight: '800',
    color: '#000',
  },
  productDescText: {},
  promoText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ProductItems;
