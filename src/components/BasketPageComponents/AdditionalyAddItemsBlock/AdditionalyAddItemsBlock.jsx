import React, { useState } from 'react';

import { Dimensions, TouchableOpacity } from 'react-native';
import { Box, ScrollView, Flex, Image, Text } from 'native-base';
import BuyBtn from '../../Elements/BuyBtn';
import ProductModal from '../../Modals/ProductModal/ProductModal';

const { width } = Dimensions.get('window');

const AdditionalyAddItemsBlock = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [isProduct, setProduct] = useState({});

  const onOpenProductModal = (el) => {
    // setProduct(el);
    // setShowModal(true);
  };

  const img = 'https://flowers.ua/images/Flowers/2397.jpg';

  const additionalyProducts = [
    {
      name: 'Ваза керамическая большая (белая)',
      price: 1200,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, iure, fugit laborum ut ab perferendis reprehenderit esse tempore modi quas aperiam quod, fugiat repellendus veritatis exercitationem beatae velit. Rem, molestias?',
      img,
    },
    {
      name: 'Букет из 101 красной розы',
      price: 3900,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, iure, fugit laborum ut ab perferendis reprehenderit esse tempore modi quas aperiam quod, fugiat repellendus veritatis exercitationem beatae velit. Rem, molestias?',
      img,
    },
    {
      name: 'Гладиолусы',
      price: 900,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, iure, fugit laborum ut ab perferendis reprehenderit esse tempore modi quas aperiam quod, fugiat repellendus veritatis exercitationem beatae velit. Rem, molestias?',
      img,
    },
  ];

  return (
    <>
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {additionalyProducts?.length
            ? additionalyProducts.map((el, i) => (
                <TouchableOpacity
                  onPress={() => onOpenProductModal(el)}
                  activeOpacity={0.6}
                  key={i}
                >
                  <Flex
                    mr={4}
                    key={i}
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
                        source={{ uri: el.img }}
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
      <ProductModal
        open={isShowModal}
        setOpen={setShowModal}
        product={isProduct}
      />
    </>
  );
};

export default AdditionalyAddItemsBlock;
