import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Dimensions, TouchableOpacity } from 'react-native';
import { Box, ScrollView, Flex, Image, Text } from 'native-base';
import BuyBtn from '../../Elements/BuyBtn';

const { width } = Dimensions.get('window');

import { getRecommendationsProducts } from '../../../store/actions/product';
import HeaderInfo from '../HeaderInfo';
import i18n from 'i18n-js';

const AdditionalyAddItemsBlock = ({
  getRecommendationsProducts,
  recommendProductsList,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    getRecommendationsProducts();
  }, [getRecommendationsProducts]);

  const pushToProductPage = (id) => {
    navigation.navigate('ProductPage', { id });
  };

  if (!recommendProductsList?.length) {
    return null;
  }

  return (
    <>
      <Box>
        <HeaderInfo label={i18n.t('productRecommend')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendProductsList?.length
            ? recommendProductsList.map((el) => (
                <TouchableOpacity
                  onPress={() => pushToProductPage(el.id)}
                  activeOpacity={0.6}
                  key={el.id}
                >
                  <Flex
                    mr={4}
                    my={4}
                    p='14px'
                    bg='#fff'
                    direction='row'
                    width={width / 1.3}
                    borderRadius={6}
                    shadow={2}
                  >
                    <Box mr={4}>
                      <Image
                        borderRadius={6}
                        width={100}
                        height={100}
                        source={{ uri: el.image }}
                        alt='Product'
                      />
                    </Box>
                    <Flex width={width / 1.3 - 134} justify='space-between'>
                      <Box>
                        <Text fontSize={14} color='#000' fontWeight='bold'>
                          {el.name}
                        </Text>
                      </Box>
                      <Box>
                        <BuyBtn price={el.price} />
                      </Box>
                    </Flex>
                  </Flex>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
      </Box>
    </>
  );
};

const mapState = ({ products: { recommendProductsList } }) => ({
  recommendProductsList,
});

const mapDispatch = (dispatch) => ({
  getRecommendationsProducts: () => dispatch(getRecommendationsProducts()),
});

export default connect(mapState, mapDispatch)(AdditionalyAddItemsBlock);
