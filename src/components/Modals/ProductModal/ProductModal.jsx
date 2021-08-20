import React, { useState, useEffect } from 'react';

import {
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Box, Flex, ScrollView, Image, Text, Slide } from 'native-base';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';

import AddToBasketFooter from '../../Elements/AddToBasketFooter';
import AddToBasketTopSlide from '../../Elements/AddToBasketTopSlide';

const { width } = Dimensions.get('window');

const CircleIconWrapper = ({ icon, fn }) => {
  return (
    <TouchableOpacity onPress={fn} style={styles.circleIconWrapper}>
      {icon}
    </TouchableOpacity>
  );
};

const ProductModal = ({ open, setOpen, product }) => {
  const [isProduct, setProduct] = useState({});
  const [isOpenSlide, setOpenSlide] = useState(false);

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
    setProduct(product);
  }, [product]);

  const onOpenTopSlide = () => {
    setOpenSlide(true);
    setTimeout(() => setOpenSlide(false), 3000);
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
                  <TouchableOpacity style={{ marginRight: 16 }}>
                    <AntDesign name='heart' size={24} color='#fff' />
                  </TouchableOpacity>
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
        <AddToBasketFooter actionFn={onOpenTopSlide} price={isProduct?.price} />
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
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: propStyles.shadowedColor,
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

export default ProductModal;
