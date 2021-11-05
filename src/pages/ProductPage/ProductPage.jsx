import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Box, Flex, ScrollView, Image, Text } from 'native-base';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import propStyles from '../../resources/propStyles';

import AddToBasketFooter from '../../components/Elements/AddToBasketFooter';
import AddToBasketTopSlide from '../../components/Elements/AddToBasketTopSlide';
import SpinnerFw from '../../components/Elements/SpinnerFw';
import PromoPercent from '../../components/Elements/PromoPercent';

const { width } = Dimensions.get('window');
import { setOrderList, getOrderList } from '../../store/actions/order';
import { getOrderFromStorage, shareUrl } from '../../resources/utils';
import SwitchAdditionalProduct from '../../components/Elements/SwitchAdditionalProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAdditItemsForProductReq } from '../../api/products';

import {
  addToFavoriteList,
  deleteFromFavoritesList,
} from '../../store/actions/favorites';
import { getProductById, updateProductById } from '../../store/actions/product';
import BuyBtn from '../../components/Elements/BuyBtn/BuyBtn';
import i18n from 'i18n-js';

const CircleIconWrapper = ({ icon, fn }) => {
  return (
    <TouchableOpacity onPress={fn} style={styles.circleIconWrapper}>
      {icon}
    </TouchableOpacity>
  );
};

const ProductModal = ({
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
  const navigation = useNavigation();
  const { id } = route.params;

  const [isProduct, setProduct] = useState({});
  const [isOpenSlide, setOpenSlide] = useState(false);
  const [matchItem, setMatchItem] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [additItems, setAdditItems] = useState([]);

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
    (async () => {
      try {
        const { data } = await getAdditItemsForProductReq();

        if (data.length) {
          setAdditItems(data.map((el) => ({ ...el, added: false })));
        }
      } catch {
        setAdditItems([]);
      }
    })();
  }, []);

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

    if (check.length) {
      const additionalItems = additItems;
      const item = check[0];

      const test = item.additItems.filter((el) => el.added);

      if (!test.length && !additionalItems.length) return;

      for (let i = 0; i <= test.length - 1; i++) {
        for (let j = 0; j <= additionalItems.length - 1; j++) {
          if (additionalItems[j].id === test[i].id) {
            additionalItems[j].added = test[i].added;
          }
        }
      }
      setAdditItems(additionalItems);
    }

    return check.length ? setMatchItem(true) : setMatchItem(false);
  }, [orderList, isProduct]);

  useEffect(() => {
    return () => {
      updateProductById({});
      setProduct({});
      setMainImage(null);
    };
  }, []);

  const pushToProductPage = (id) => {
    navigation.navigate('ProductPage', { id });
  };

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
          additItems: additItems.filter((el) => el.added),
          recomendation: null,
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
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    fn={navigation.goBack}
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
                      fn={() => shareUrl(productById.id)}
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
              {isProduct?.images?.length && (
                <Box my={3}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {isProduct.images.map((el, i) => (
                      <TouchableOpacity
                        style={styles.additItem}
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
                {additItems?.length ? (
                  <Box mt={5}>
                    <Box
                      _text={{
                        fontWeight: '700',
                        fontSize: 20,
                        color: '#000',
                      }}
                      mb={3}
                    >
                      {i18n.t('productAdditionals')}
                    </Box>
                    {additItems.map((addit, i) => (
                      <SwitchAdditionalProduct
                        key={addit.id}
                        matchItem={matchItem}
                        item={addit}
                        setAdded={(val, id) => {
                          const items = additItems.map((el) =>
                            el.id === id ? { ...el, added: val } : el
                          );
                          setAdditItems(items);
                        }}
                      />
                    ))}
                  </Box>
                ) : null}
                {isProduct?.recomendation?.length ? (
                  <Box mt={5}>
                    <Box
                      _text={{ fontWeight: '700', fontSize: 20, color: '#000' }}
                      mb={3}
                    >
                      {i18n.t('productSimilarProducts')}
                    </Box>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {isProduct?.recomendation.map((el) => (
                        <TouchableOpacity
                          onPress={() => pushToProductPage(el.id)}
                          style={{
                            width: (width - 30) / 2.5,
                            marginRight: 10,
                          }}
                          key={el.id}
                        >
                          <ImageBackground
                            style={[
                              styles.additItemCarouselImg,
                              {
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                              },
                            ]}
                            borderRadius={14}
                            source={{ uri: el.image }}
                            alt='Other photos'
                          >
                            <PromoPercent promo={el?.stock} />
                          </ImageBackground>
                          <Box m={1}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode='tail'
                              color='#000'
                              fontSize={16}
                            >
                              {el.name}
                            </Text>
                          </Box>
                          <BuyBtn price={el.price} />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </Box>
                ) : null}
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
  additItem: {
    width: (width - 30) / 3,
    marginHorizontal: 5,
  },
  additItemCarouselImg: {
    width: (width - 30) / 2.5,
    height: (width - 30) / 2.5,
    marginHorizontal: 5,
  },
  carouselImg: {
    width: (width - 30) / 3,
    height: (width - 30) / 3,
    borderRadius: 6,
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
