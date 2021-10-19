import React from 'react';
import { useNavigation } from '@react-navigation/core';

import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Box, Flex, Text } from 'native-base';

const { width } = Dimensions.get('window');

const ProductItemsColumn = ({ data }) => {
  const navigation = useNavigation();

  const onOpenProductModal = (id) => {
    navigation.navigate('ProductPage', { id });
  };

  return (
    <>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onOpenProductModal(item.id)}
          style={styles.item}
        >
          <Flex direction='row'>
            <ImageBackground
              style={styles.productImg}
              source={{ uri: item.image }}
              imageStyle={{ borderRadius: 6 }}
            >
              {item.promo && <PromoPercent promo={el.promo} />}
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
