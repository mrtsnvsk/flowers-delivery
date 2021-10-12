import React from 'react';
import { connect } from 'react-redux';

import { Dimensions, TouchableOpacity } from 'react-native';
import { Flex, Box, Image, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';

import BasketCountBtns from '../BasketCountBtns';
import DottedUnderline from '../DottedUnderline';

const { width } = Dimensions.get('window');
import { setOrderList } from '../../../store/actions/order';
import { getOrderFromStorage } from '../../../resources/utils';

import { imgPath } from '../../../resources/variables';

const BasketItem = ({ order, setOrder, setOrderList, deleteItem }) => {
  const setProductCount = async (count, id) => {
    const prevList = await getOrderFromStorage();

    const idx = prevList.findIndex((el) => el.name === id),
      list = [
        ...prevList.slice(0, idx),
        { ...prevList[idx], count },
        ...prevList.slice(idx + 1),
      ];
    setOrderList(list);
    setOrder(list);
  };

  return (
    <>
      {order.map((item, i) => (
        <Box key={i} borderRadius={6} mb={4} bg='#fff'>
          <Box p='14px' mb={3}>
            <Flex alignItems='flex-end'>
              <TouchableOpacity
                onPress={async () => await deleteItem(item.name)}
              >
                <AntDesign
                  name='close'
                  size={18}
                  color={propStyles.shadowColor}
                />
              </TouchableOpacity>
            </Flex>
            <Flex direction='row' alignItems='center'>
              <Box mr={'14px'}>
                <Image
                  borderRadius={6}
                  width={100}
                  height={100}
                  source={{ uri: item.images[0].url }}
                  alt='Product'
                />
              </Box>
              <Box>
                <Box>
                  <Text
                    style={{ width: width - 180 }}
                    ellipsizeMode={'tail'}
                    numberOfLines={3}
                    color='#000'
                    fontSize={18}
                    fontWeight='bold'
                  >
                    {item.name}
                  </Text>
                </Box>
                <Flex direction='row' mt={3}>
                  {/* <Text
                    mr={2}
                    style={{
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}
                    fontWeight='500'
                    fontSize={14}
                    color={propStyles.mainRedColor}
                  >
                    2390,00 p.
                  </Text> */}
                  <Text fontWeight='600' fontSize={15}>
                    {item.price} p.
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
          {item?.package ? (
            <Box width={width - 32} px='14px' mb={4}>
              <Flex
                pb='2px'
                direction='row'
                align='center'
                justify='space-between'
              >
                <Box width={width - 130}>
                  <Text fontSize={14}>{item.package.name}</Text>
                </Box>
                <Box>
                  <Text fontSize={14}>x1 {item.package.price} p.</Text>
                </Box>
              </Flex>
              <DottedUnderline />
            </Box>
          ) : null}
          <Flex
            borderTopWidth={1}
            borderTopColor={propStyles.shadowColor}
            p='14px'
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Flex direction='row' alignItems='center'>
              <Box mr={'20px'} _text={{ fontWeight: '600' }}>
                Всего за товар:
              </Box>
              <BasketCountBtns
                setCount={setProductCount}
                productId={item.name}
                count={item.count}
              />
            </Flex>

            <Box>
              <Text fontWeight='600'>{item.price * item.count} p.</Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setOrderList: (data) => dispatch(setOrderList(data)),
});

export default connect(null, mapDispatchToProps)(React.memo(BasketItem));
