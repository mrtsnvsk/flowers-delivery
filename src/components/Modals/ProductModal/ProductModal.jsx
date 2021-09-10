import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import {
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Box, Flex, ScrollView, Image, Text } from 'native-base';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';

import AddToBasketFooter from '../../Elements/AddToBasketFooter';
import AddToBasketTopSlide from '../../Elements/AddToBasketTopSlide';

const { width } = Dimensions.get('window');
import { setOrderList, getOrderList } from '../../../store/actions/order';
import { getOrderFromStorage } from '../../../resources/utils';
import SwitchAdditionalProduct from '../../Elements/SwitchAdditionalProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  addToFavoriteList,
  deleteFromFavoritesList,
} from '../../../store/actions/favorites';

const CircleIconWrapper = ({ icon, fn }) => {
  return (
    <TouchableOpacity onPress={fn} style={styles.circleIconWrapper}>
      {icon}
    </TouchableOpacity>
  );
};

const ProductModal = ({
  open,
  setOpen,
  product,
  setOrderList,
  orderList,
  getOrderList,
  addToFavoriteList,
  deleteFromFavoritesList,
}) => {
  const [isProduct, setProduct] = useState({});
  const [isOpenSlide, setOpenSlide] = useState(false);
  const [matchItem, setMatchItem] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const otherImgs = [
    {
      uri: 'https://flowers.ua/images/Flowers/2397.jpg',
    },
    {
      uri: 'https://kvitka-distribution.com.ua/content/images/46/68152390812268_small11.jpg',
    },
    {
      uri: 'https://st.volga.news/image/w630/413ab04d-ddc8-4c46-a697-016be62026b2.jpg',
    },
  ];

  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

  useEffect(() => {
    setProduct(product);
  }, [product]);

  useEffect(() => {
    (async () => {
      const fav = await AsyncStorage.getItem('@favorites');

      if (fav) {
        const favList = JSON.parse(fav);
        setFavorite(!!favList.filter((el) => el.id === isProduct.id).length);
      } else {
        setFavorite(false);
      }
    })();
  }, [isProduct]);

  useEffect(() => {
    const check = orderList.filter((el) => el.name === isProduct.name);

    check.length
      ? (() => {
          setMatchItem(true);
        })()
      : setMatchItem(false);
  }, [orderList, isProduct]);

  const onOpenTopSlide = () => {
    setOpenSlide(true);
    setTimeout(() => setOpenSlide(false), 3000);
  };

  const addToBasket = async () => {
    const prevList = await getOrderFromStorage(),
      list = [...prevList, { ...isProduct, count: 1 }];
    onOpenTopSlide();
    setOrderList(list);
  };

  const deleteFromBasket = async () => {
    const prevList = await getOrderFromStorage(),
      list = prevList.filter((el) => el.name !== isProduct.name);
    setOrderList(list);
  };

  const toggleFavorite = () => {
    if (!isFavorite) {
      addToFavoriteList(isProduct);
      setFavorite((prevState) => !prevState);
    } else {
      deleteFromFavoritesList(isProduct.id);
      setFavorite((prevState) => !prevState);
    }
  };

  return (
    <Modal animationType='slide' transparent={true} visible={open}>
      <>
        <Box style={styles.modal}>
          <ScrollView>
            <ImageBackground
              resizeMode='stretch'
              style={styles.imgBg}
              source={{ uri: isProduct?.img }}
            >
              <Flex direction='row' justify='space-between' alignItems='center'>
                <CircleIconWrapper
                  fn={() => setOpen(false)}
                  icon={
                    <AntDesign
                      name='close'
                      size={24}
                      color={propStyles.mainRedColor}
                    />
                  }
                />
                <Flex direction='row' alignItems='center'>
                  <Box mr='16px'>
                    <CircleIconWrapper
                      icon={
                        <TouchableOpacity onPress={toggleFavorite}>
                          <AntDesign
                            name='heart'
                            size={20}
                            color={
                              isFavorite ? propStyles.spinnerColor : '#fff'
                            }
                          />
                        </TouchableOpacity>
                      }
                    />
                  </Box>

                  <CircleIconWrapper
                    icon={
                      <MaterialIcons
                        name='more-vert'
                        size={24}
                        color={propStyles.mainRedColor}
                      />
                    }
                  />
                </Flex>
              </Flex>
            </ImageBackground>
            {/* photos carousel */}
            <Box my={3}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {otherImgs.map((el, i) => (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    key={i}
                    onPress={() => setProduct({ ...isProduct, img: el.uri })}
                  >
                    <Image
                      style={styles.carouselImg}
                      source={{ uri: el.uri }}
                      alt='Other photos'
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Box>
            <Box p='20px'>
              <Box>
                <Text style={styles.productNameText}>{isProduct?.name}</Text>
              </Box>
              <Box mt={3}>
                <Text style={styles.productDescText}>{isProduct?.desc}</Text>
              </Box>
              <Box mt={5}>
                <Box
                  _text={{ fontWeight: '700', fontSize: 20, color: '#000' }}
                  mb={3}
                >
                  Дополнительно
                </Box>
                <SwitchAdditionalProduct />
              </Box>

              <Box mt={5}>
                <Box
                  _text={{ fontWeight: '700', fontSize: 20, color: '#000' }}
                  mb={3}
                >
                  Похожие букеты
                </Box>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {otherImgs.map((el, i) => (
                    <TouchableOpacity key={i}>
                      <Image
                        style={styles.carouselImg}
                        source={{ uri: el.uri }}
                        alt='Other photos'
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Box>
            </Box>
          </ScrollView>
        </Box>
        <AddToBasketFooter
          matchItem={matchItem}
          actionDeleteFn={deleteFromBasket}
          actionFn={addToBasket}
          price={isProduct?.price}
        />
        <AddToBasketTopSlide productName={isProduct?.name} open={isOpenSlide} />
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    paddingBottom: 74,
  },
  imgBg: {
    paddingTop: 50,
    paddingHorizontal: 20,
    width,
    height: 300,
  },
  circleIconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C6C6C6',
    borderRadius: 50,
  },
  carouselImg: {
    width: (width - 30) / 3,
    height: (width - 30) / 3,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  productNameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  productDescText: {},
});

const mapStateToProps = ({ order: { orderList } }) => {
  return {
    orderList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setOrderList: (data) => dispatch(setOrderList(data)),
  getOrderList: () => dispatch(getOrderList()),
  addToFavoriteList: (data) => dispatch(addToFavoriteList(data)),
  deleteFromFavoritesList: (id) => dispatch(deleteFromFavoritesList(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
