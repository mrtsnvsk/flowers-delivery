import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import {
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Box, Flex, ScrollView, Image, Text, Menu, Button } from 'native-base';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import propStyles from '../../resources/propStyles';

import AddToBasketFooter from '../../components/Elements/AddToBasketFooter';
import AddToBasketTopSlide from '../../components/Elements/AddToBasketTopSlide';
import SpinnerFw from '../../components/Elements/SpinnerFw';

const { width } = Dimensions.get('window');
import { setOrderList, getOrderList } from '../../store/actions/order';
import { getOrderFromStorage } from '../..resources/utils';
import SwitchAdditionalProduct from '../../components/Elements/SwitchAdditionalProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  addToFavoriteList,
  deleteFromFavoritesList,
} from '../../../store/actions/favorites';
import {
  getProductById,
  updateProductById,
} from '../../../store/actions/product';

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
  // id,
  setOrderList,
  orderList,
  getOrderList,
  addToFavoriteList,
  deleteFromFavoritesList,
  getProductById,
  productById,
  loadingProductById,
  updateProductById,
  route,
}) => {
  const [isProduct, setProduct] = useState({});
  const [isOpenSlide, setOpenSlide] = useState(false);
  const [matchItem, setMatchItem] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [isPackage, setPackage] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  const { id } = route.params;

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
    getProductById(id);
  }, [id]);

  useEffect(() => {
    if (productById) {
      setProduct(productById);
      setMainImage(productById?.images[0]?.url);
    }
  }, [productById, id]);

  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

  useMemo(() => {
    return (async () => {
      const fav = await AsyncStorage.getItem('@favorites');

      if (fav) {
        const favList = JSON.parse(fav);
        setFavorite(!!favList.filter((el) => el.id === isProduct?.id).length);
      } else {
        setFavorite(false);
      }
    })();
  }, [isProduct]);

  useMemo(() => {
    const check = orderList.filter((el) => el.id === isProduct?.id);

    return check.length
      ? (() => {
          setMatchItem(true);
        })()
      : setMatchItem(false);
  }, [orderList, isProduct]);

  useEffect(() => {
    return () => {
      updateProductById({});
      setProduct({});
      setMainImage(null);
    };
  }, []);

  const onOpenTopSlide = () => {
    setOpenSlide(true);
    setTimeout(() => setOpenSlide(false), 3000);
  };

  const addToBasket = async () => {
    const prevList = await getOrderFromStorage(),
      list = [
        ...prevList,
        {
          ...isProduct,
          price: isProduct?.stock ? isProduct.stock : isProduct?.price,
          count: 1,
          package: !isPackage
            ? null
            : { price: 250, name: 'Добавить в упаковку' },
        },
      ];
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
      addToFavoriteList({ ...productById, image: productById?.images[0]?.url });
      setFavorite((prevState) => !prevState);
    } else {
      deleteFromFavoritesList(isProduct.id);
      setFavorite((prevState) => !prevState);
    }
  };

  return (
    <Box>
      {loadingProductById ? (
        <Box style={styles.modal}>
          <SpinnerFw />
        </Box>
      ) : (
        <>
          <Box style={styles.modal}>
            <ScrollView>
              <ImageBackground
                resizeMode='stretch'
                style={styles.imgBg}
                source={{ uri: mainImage }}
              >
                <Flex
                  direction='row'
                  justify='space-between'
                  alignItems='center'
                >
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
                    <Box>
                      <CircleIconWrapper
                        icon={
                          <MaterialIcons
                            name='more-vert'
                            size={24}
                            color={propStyles.mainRedColor}
                          />
                        }
                      />
                    </Box>
                  </Flex>
                </Flex>
              </ImageBackground>
              {/* photos carousel */}
              {isProduct?.images?.length && (
                <Box my={3}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {isProduct.images.map((el, i) => (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        key={i}
                        onPress={() => setMainImage(el.url)}
                      >
                        <Image
                          style={styles.carouselImg}
                          source={{ uri: el.url }}
                          alt='Other photos'
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Box>
              )}
              <Box p='20px'>
                <Box>
                  <Text style={styles.productNameText}>{isProduct?.name}</Text>
                </Box>
                <Box mt={3}>
                  <Text style={styles.productDescText}>
                    {isProduct?.description}
                  </Text>
                </Box>
                <Box mt={5}>
                  <Box
                    _text={{ fontWeight: '700', fontSize: 20, color: '#000' }}
                    mb={3}
                  >
                    Дополнительно
                  </Box>
                  <SwitchAdditionalProduct
                    matchItem={matchItem}
                    value={isPackage}
                    setValue={setPackage}
                  />
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
            price={isProduct?.stock ? isProduct.stock : isProduct?.price}
            oldPrice={isProduct?.stock ? isProduct?.price : null}
          />
          <AddToBasketTopSlide
            productName={isProduct?.name}
            open={isOpenSlide}
          />
        </>
      )}
    </Box>
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
    borderRadius: 6,
    marginHorizontal: 5,
  },
  productNameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  productDescText: {},
});

const mapStateToProps = ({
  order: { orderList },
  products: { productById, loadingProductById },
}) => {
  return {
    orderList,
    productById,
    loadingProductById,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setOrderList: (data) => dispatch(setOrderList(data)),
  getOrderList: () => dispatch(getOrderList()),
  addToFavoriteList: (data) => dispatch(addToFavoriteList(data)),
  deleteFromFavoritesList: (id) => dispatch(deleteFromFavoritesList(id)),
  getProductById: (id) => dispatch(getProductById(id)),
  updateProductById: () => dispatch(updateProductById()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
