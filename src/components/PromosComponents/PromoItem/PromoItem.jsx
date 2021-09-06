import React from 'react';

import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Box, ScrollView, Image, Text } from 'native-base';
import BuyBtn from '../../Elements/BuyBtn';

const { width } = Dimensions.get('window');

const PromoItem = () => {
  const img =
    'https://shop.camellia.ua/upload/kamelia_flora/photos/80/78/1200x1200/ee0bc92_5e26c6781a49e.JPG';

  const products = [
    {
      name: 'БУКЕТ НЕДЕЛИ',
      price: 1200,
      img,
    },
    {
      name: 'БУКЕТ ДНЯ',
      price: 1000,
      img,
    },
    {
      name: 'БУКЕТ МЕСЯЦА',
      price: 2000,
      img,
    },
    {
      name: 'БУКЕТ ГОДА',
      price: 900,
      img,
    },
  ];

  return (
    <Box pl='20px'>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {products?.length ? (
          products.map((el, i) => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.container}
              key={i}
            >
              <Box>
                <Image
                  source={{ uri: img }}
                  style={styles.productImg}
                  alt='Product'
                />
              </Box>
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
                <BuyBtn price={el.price} />
              </Box>
            </TouchableOpacity>
          ))
        ) : (
          <Box></Box>
        )}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - 40) / 2.4,
    marginRight: 13,
  },
  productImg: {
    width: (width - 40) / 2.4,
    height: (width - 40) / 2.4,
    borderRadius: 14,
  },
  productNameText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default PromoItem;
