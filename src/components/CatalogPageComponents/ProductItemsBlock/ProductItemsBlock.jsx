import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Box, Flex, Text } from 'native-base';

import BuyBtn from '../../Elements/BuyBtn';

const ProductItemsBlock = ({ data }) => {
  const navigation = useNavigation();

  const onOpenProductModal = (id) => {
    navigation.navigate('ProductPage', { id });
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
                imageStyle={{ borderRadius: 6 }}
              >
                {el.promo && <PromoPercent promo={el.promo} />}
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
