import React from 'react';
import { connect } from 'react-redux';

import { Dimensions, TouchableOpacity } from 'react-native';
import { Flex, Box, Image, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';
import BasketCountBtns from '../BasketCountBtns';

const { width } = Dimensions.get('window');
import { setOrderList } from '../../../store/actions/order';
import { getOrderFromStorage } from '../../../resources/utils';

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
      {order.map((item) => (
        <Box borderRadius={14} mb={4} bg='#fff'>
          <Box p='14px' mb={4}>
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
                  borderRadius={14}
                  width={100}
                  height={100}
                  source={{ uri: item.img }}
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
                    fontWeight='600'
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
                    {item.price.toFixed(2)} p.
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
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
              <Text fontWeight='600'>
                {(item.price * item.count).toFixed(2)} p.
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderList: (data) => dispatch(setOrderList(data)),
  };
};

export default connect(null, mapDispatchToProps)(BasketItem);
