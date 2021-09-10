import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text, ScrollView, Center, TextArea, Flex } from 'native-base';
import propStyles from '../../resources/propStyles';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Tabs from '../../components/OrderingPageComponents/Tabs';
import BlockLabel from '../../components/OrderingPageComponents/BlockLabel';
import DeliveryMethodRadio from '../../components/OrderingPageComponents/DeliveryMethodRadio';
import ProceedOrderBtn from '../../components/OrderingPageComponents/ProceedOrderBtn';
import SelectOrderAddress from '../../components/OrderingPageComponents/SelectOrderAddress';
import InputUnderline from '../../components/Elements/InputUnderline/InputUnderline';
import OrderingItem from '../../components/OrderingPageComponents/OrderingItem';

import { getOrderList } from '../../store/actions/order';
import OrderDetails from '../../components/BasketPageComponents/OrderDetails/OrderDetails';
import BackTabBtn from '../../components/OrderingPageComponents/BackTabBtn';

const OrderingPage = ({ getOrderList, orderList }) => {
  const [tab, setTab] = useState(0);
  const [orderTo, setOrderTo] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const radioOrdetToList = [
    {
      name: 'Доставка до двери',
      value: 'delivery',
    },
    {
      name: 'Самовывоз',
      value: 'pickup',
    },
  ];

  const radioPaymentMethodList = [
    {
      name: 'Оплата онлайн',
      value: 'online',
    },
    {
      name: 'Наличными курьеру',
      value: 'courCash',
    },
    {
      name: 'Картой курьеру',
      value: 'courCard',
    },
  ];

  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

  return (
    <Box flex={1} bg='#fff' p='20px'>
      <Tabs tabId={tab} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* tab1 */}
        {tab === 0 && (
          <>
            <Box mt={'30px'}>
              <BlockLabel label={'Способ доставки'} />
              <DeliveryMethodRadio
                radioData={radioOrdetToList}
                value={orderTo}
                setValue={setOrderTo}
              />
            </Box>
            <Box mt='30px'>
              {orderTo === 'pickup' && (
                <Box mb='30px'>
                  <SelectOrderAddress />
                </Box>
              )}
              <BlockLabel label={'Время доставки'} />
              <TouchableOpacity style={styles.joinTimeWrapper}>
                <Box>
                  <Text color='#000'>
                    Нажмите здесь, чтобы указать время доставки
                  </Text>
                </Box>
                <Box>
                  <Entypo
                    name='chevron-right'
                    size={24}
                    color={propStyles.grayColor}
                  />
                </Box>
              </TouchableOpacity>
            </Box>
            <ProceedOrderBtn tab={tab} setTab={setTab} />
          </>
        )}
        {/* tab2 */}
        {tab === 1 && (
          <Box mt='30px'>
            <Box mb={4}>
              <InputUnderline
                value={name}
                setValue={setName}
                placeholder='Введите имя'
              />
            </Box>
            <Box mb={4}>
              <InputUnderline
                value={phone}
                setValue={setPhone}
                placeholder='Введите номер'
              />
            </Box>
            <Box>
              <InputUnderline
                value={email}
                setValue={setEmail}
                placeholder='Введите email'
              />
            </Box>
            <Center>
              <TouchableOpacity style={styles.joinAddressBtn}>
                <Box mr={4}>
                  <Ionicons name='location-sharp' size={24} color={'#fff'} />
                </Box>
                <Box>
                  <Text color='#fff'>Указать адрес</Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity style={styles.joinFromListBtn}>
                <Text>Выбрать из списка</Text>
              </TouchableOpacity>
            </Center>
            <Box mt='30px'>
              <Box mb={4}>
                <InputUnderline placeholder='Введите город' />
              </Box>
              <Box mb={4}>
                <InputUnderline placeholder='Введите регион' />
              </Box>
              <Box mb={4}>
                <InputUnderline placeholder='Введите этаж' />
              </Box>
              <Box mb={4}>
                <InputUnderline placeholder='Введите квартиру' />
              </Box>
            </Box>
            <Center mt={5}>
              <TouchableOpacity
                style={[styles.joinFromListBtn, { width: 240 }]}
              >
                <Text>Сохранить адрес</Text>
              </TouchableOpacity>
              <ProceedOrderBtn tab={tab} setTab={setTab} />
            </Center>
          </Box>
        )}
        {tab === 2 && (
          <Box mt='30px'>
            <Box>
              <BlockLabel label='Адрес доставки' />
              <Box px={1}>
                {orderList.length
                  ? orderList.map((el) => <OrderingItem item={el} />)
                  : null}
              </Box>
            </Box>
            <OrderDetails hideOrderBtn={true} order={orderList} />
            <Box mt='30px'>
              <BlockLabel label='Ваш комментарий' />
              <TextArea h={24} placeholder='Написать комментарий' />
            </Box>
            <ProceedOrderBtn tab={tab} setTab={setTab} />
            <BackTabBtn label=' Вернуться к адресу' setTab={setTab} />
          </Box>
        )}
        {tab === 3 && (
          <Box mt='30px'>
            <Box>
              <BlockLabel label='Способ оплаты' />
              <Box>
                <Text fontSize={14} color={propStyles.shadowColor}>
                  Выберите свой способ оплаты
                </Text>
              </Box>
              <DeliveryMethodRadio
                value={paymentMethod}
                setValue={setPaymentMethod}
                radioData={radioPaymentMethodList}
              />
            </Box>
            <TouchableOpacity style={styles.useBonusesBtn}>
              <Box>
                <Text fontSize={15} color={propStyles.shadowColor}>
                  Использовать бонусы
                </Text>
              </Box>
              <Flex direction='row' justify='flex-end' align='center'>
                <Box mr={2}>
                  <MaterialIcons name='add-task' size={24} color={'#FECC1A'} />
                </Box>
                <Box>
                  <Text color={propStyles.shadowColor}>0</Text>
                </Box>
              </Flex>
            </TouchableOpacity>
            <OrderDetails hideOrderBtn={true} order={orderList} />
            <Center mt={'30px'}>
              <TouchableOpacity style={styles.submitOrderBtn}>
                <Text color='#fff'>Оформить заказ</Text>
              </TouchableOpacity>
            </Center>
            <BackTabBtn label=' Вернуться к деталям заказа' setTab={setTab} />
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  joinTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitBtn: {
    alignItems: 'center',
    backgroundColor: '#000',
    width: 240,
    borderRadius: 4,
    paddingVertical: 12,
  },
  joinAddressBtn: {
    width: '80%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: propStyles.mainRedColor,
    borderRadius: 4,
    marginVertical: 20,
  },
  joinFromListBtn: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderColor: propStyles.mainRedColor,
    borderWidth: 1,
    borderRadius: 4,
  },
  useBonusesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: propStyles.shadowedColor,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  submitOrderBtn: {
    backgroundColor: propStyles.mainRedColor,
    alignItems: 'center',
    width: 240,
    borderRadius: 4,
    paddingVertical: 14,
  },
});

const mapStateToProps = ({ order: { orderList } }) => ({ orderList });

const mapDispatchToProps = (dispatch) => ({
  getOrderList: () => dispatch(getOrderList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderingPage);
