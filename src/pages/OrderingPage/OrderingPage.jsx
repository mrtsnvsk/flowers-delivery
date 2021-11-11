import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  Box,
  Text,
  ScrollView,
  Center,
  TextArea,
  Flex,
  KeyboardAvoidingView,
} from 'native-base';
import propStyles from '../../resources/propStyles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Tabs from '../../components/OrderingPageComponents/Tabs';
import BlockLabel from '../../components/OrderingPageComponents/BlockLabel';
import DeliveryMethodRadio from '../../components/OrderingPageComponents/DeliveryMethodRadio';
import ProceedOrderBtn from '../../components/OrderingPageComponents/ProceedOrderBtn';
import SelectOrderAddress from '../../components/OrderingPageComponents/SelectOrderAddress';
import InputUnderline from '../../components/Elements/InputUnderline/InputUnderline';
import OrderingItem from '../../components/OrderingPageComponents/OrderingItem';
import AddCoupon from '../../components/BasketPageComponents/AddCoupon';
import BackTabBtn from '../../components/OrderingPageComponents/BackTabBtn';
import OrderDetails from '../../components/BasketPageComponents/OrderDetails/OrderDetails';
import OrderDetailLine from '../../components/OrderingPageComponents/OrderDetailLine/OrderDetailLine';
import DateTimePicker from '../../components/OrderingPageComponents/DateTimePicker';
import TimePickerModal from '../../components/Modals/TimePickerModal';
import DatePickerModal from '../../components/Modals/DatePickerModal/DatePickerModal';
import BonusesActionSheet from '../../components/OrderingPageComponents/BonusesActionSheet/BonusesActionSheet';

import i18n from 'i18n-js';
import { getOrderList } from '../../store/actions/order';
import { getDeliveryPriceReq, getUserBonusesReq } from '../../api/order';
import { getUserDataFromStorage, onAlert } from '../../resources/utils';

const OrderingPage = ({ getOrderList, orderList, orderAddress }) => {
  const navigation = useNavigation();
  const curDateTime = new Date();

  // datetime picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  // datetime picker
  const [userData, setUserData] = useState(null);
  const [showBonusesAction, setShowBonusesAction] = useState(false);
  const [useBonuses, setUseBonuses] = useState(0);
  const [bonuses, setBonuses] = useState(null);

  const [couponStock, setCouponStock] = useState(null);
  const [tab, setTab] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    region: '',
    floor: '',
    apartment: '',
    comment: '',
    orderTo: 'delivery',
    paymentMethod: 'online',
    pickupAddress: '',
    deliveryDate: curDateTime,
    deliveryTime: { from: curDateTime, to: curDateTime },
  });

  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

  useEffect(() => {
    getDeliveryPrice();
  }, [orderAddress, orderList]);

  useEffect(() => {
    (async () => {
      const user = await getUserDataFromStorage();

      setUserData(user);

      try {
        const { data } = await getUserBonusesReq(user.id);

        setBonuses(data);
      } catch {}
    })();
  }, []);

  // console.log('couponStock', orderInfo);

  const orderTotalPrice = () =>
    orderList.reduce((acc, val) => acc + val.price * val.count, 0);
  const orderAdditItemsPrice = () =>
    orderList.reduce(
      (acc, val) =>
        +acc + +val.additItems.reduce((acc2, val2) => acc2 + val2.price, 0),
      0
    );

  const getDeliveryPrice = async () => {
    if (!orderAddress) return;

    const totalAmount = orderTotalPrice() + orderAdditItemsPrice(),
      deliveryAddress = {
        lat: orderAddress.latitude,
        lon: orderAddress.longitude,
        address: orderAddress.curLocName,
        amount: totalAmount,
      };

    const {
      data: { price },
    } = await getDeliveryPriceReq(deliveryAddress);

    setDeliveryPrice(+price);
  };

  const radioOrdetToList = [
    {
      name: i18n.t('orderingDoorToDoorDelivery'),
      value: 'delivery',
    },
    {
      name: i18n.t('orderingPickupDelivery'),
      value: 'pickup',
    },
  ];

  const radioPaymentMethodList = [
    {
      name: i18n.t('orderingPaymentOnline'),
      value: 'online',
    },
    {
      name: i18n.t('orderingCourierCash'),
      value: 'courCash',
    },
    {
      name: i18n.t('orderingCourierCard'),
      value: 'courCard',
    },
  ];

  const onPushToLink = (link) => {
    navigation.navigate(link);
  };

  const existAddress = () => {
    const { name, phone, email, city, region, floor, apartment } = orderInfo,
      emptyOrderInfo =
        !name ||
        !phone ||
        !email ||
        !city ||
        !region ||
        !floor ||
        !apartment ||
        !orderAddress?.curLocName;

    return !emptyOrderInfo;
  };

  const saveAddress = () => {
    if (!existAddress()) {
      onAlert(i18n.t('orderingNoOrderInfoAlert'));
      return;
    }
  };

  const getOrderTotalPriceWithStocks = () => {
    const price = orderTotalPrice() + orderAdditItemsPrice() + deliveryPrice;

    const coupStock =
      couponStock?.type === 'percent'
        ? (price / 100) * +couponStock?.price
        : couponStock?.type === 'money'
        ? price - +couponStock?.price
        : price;

    return coupStock - useBonuses;
  };

  const submitOrder = () => {
    const amount =
      orderTotalPrice() + orderAdditItemsPrice() + deliveryPrice || 0;

    console.log({
      order: orderList,
      address: orderAddress,
      info: orderInfo,
      stocks: {
        coupon: couponStock,
        bonuses: useBonuses,
      },
      amount,
      amountWithStock: getOrderTotalPriceWithStocks(),
      deliveryPrice,
      userId: userData.id,
    });
  };

  return (
    <>
      <Box flex={1} bg='#fff' p='20px' py={2}>
        <Tabs tabId={tab} />
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
          behavior='padding'
          enabled
          keyboardVerticalOffset={80}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* tab1 */}
            {tab === 0 && (
              <>
                <Box mt={'30px'}>
                  <BlockLabel label={i18n.t('orderingDeliveryMethod')} />
                  <DeliveryMethodRadio
                    radioData={radioOrdetToList}
                    value={orderInfo.orderTo}
                    setValue={(value) =>
                      setOrderInfo({ ...orderInfo, orderTo: value })
                    }
                  />
                </Box>
                <Box mt='30px'>
                  {orderInfo.orderTo === 'pickup' ? (
                    <Box mb='30px'>
                      <SelectOrderAddress
                        address={orderInfo.pickupAddress}
                        setAddress={(address) =>
                          setOrderInfo({ ...orderInfo, pickupAddress: address })
                        }
                      />
                    </Box>
                  ) : (
                    <>
                      <Box mb='20px'>
                        <DateTimePicker
                          show={showDatePicker}
                          setShow={setShowDatePicker}
                          label='Дата доставки'
                          desc='Нажмите здесь, чтобы указать дату доставки'
                          children={
                            <DatePickerModal
                              show={showDatePicker}
                              setShow={setShowDatePicker}
                              date={orderInfo.deliveryDate}
                              setDate={(date) =>
                                setOrderInfo({
                                  ...orderInfo,
                                  deliveryDate: date,
                                })
                              }
                            />
                          }
                        />
                      </Box>
                      <DateTimePicker
                        show={showTimePicker}
                        setShow={setShowTimePicker}
                        label={i18n.t('orderingDeliveryTime')}
                        desc={i18n.t('orderingJoinDeliveryTime')}
                        children={
                          <TimePickerModal
                            show={showTimePicker}
                            setShow={setShowTimePicker}
                            timeFrom={orderInfo.deliveryTime.from}
                            timeTo={orderInfo.deliveryTime.to}
                            setTimeFrom={(time) =>
                              setOrderInfo({
                                ...orderInfo,
                                deliveryTime: {
                                  ...orderInfo.deliveryTime,
                                  from: time,
                                },
                              })
                            }
                            setTimeTo={(time) =>
                              setOrderInfo({
                                ...orderInfo,
                                deliveryTime: {
                                  ...orderInfo.deliveryTime,
                                  to: time,
                                },
                              })
                            }
                          />
                        }
                      />
                    </>
                  )}
                </Box>
                <ProceedOrderBtn tab={tab} setTab={setTab} />
              </>
            )}
            {/* tab2 */}
            {tab === 1 && (
              <Box mt='30px'>
                <Box mb={4}>
                  <InputUnderline
                    value={orderInfo.name}
                    setValue={(text) =>
                      setOrderInfo({ ...orderInfo, name: text })
                    }
                    placeholder={i18n.t('orderingNameInput')}
                  />
                </Box>
                <Box mb={4}>
                  <InputUnderline
                    value={orderInfo.phone}
                    setValue={(text) =>
                      setOrderInfo({ ...orderInfo, phone: text })
                    }
                    placeholder={i18n.t('orderingPhoneInput')}
                  />
                </Box>
                <Box mb={4}>
                  <InputUnderline
                    value={orderInfo.email}
                    setValue={(text) =>
                      setOrderInfo({ ...orderInfo, email: text })
                    }
                    placeholder={i18n.t('orderingEmailInput')}
                  />
                </Box>
                {orderAddress?.curLocName && (
                  <Box>
                    <Text fontSize={14} color='#A7A7A7'>
                      {i18n.t('orderingAddress')}: {orderAddress.curLocName}
                    </Text>
                  </Box>
                )}
                <Center>
                  <TouchableOpacity
                    onPress={() => onPushToLink('MapPage')}
                    style={styles.joinAddressBtn}
                  >
                    <Box mr={4}>
                      <Ionicons
                        name='location-sharp'
                        size={24}
                        color={'#fff'}
                      />
                    </Box>
                    <Box>
                      <Text color='#fff'>
                        {i18n.t('orderingIndicareAddress')}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.joinFromListBtn}>
                    <Text>{i18n.t('orderingJoinAddress')}</Text>
                  </TouchableOpacity>
                </Center>
                <Box mt='30px'>
                  <Box mb={4}>
                    <InputUnderline
                      value={orderInfo.city}
                      setValue={(text) =>
                        setOrderInfo({ ...orderInfo, city: text })
                      }
                      placeholder={i18n.t('orderingCityInput')}
                    />
                  </Box>
                  <Box mb={4}>
                    <InputUnderline
                      value={orderInfo.region}
                      setValue={(text) =>
                        setOrderInfo({ ...orderInfo, region: text })
                      }
                      placeholder={i18n.t('orderingRegionInput')}
                    />
                  </Box>
                  <Box mb={4}>
                    <InputUnderline
                      value={orderInfo.floor}
                      setValue={(text) =>
                        setOrderInfo({ ...orderInfo, floor: text })
                      }
                      placeholder={i18n.t('orderingFloorInput')}
                    />
                  </Box>
                  <Box mb={4}>
                    <InputUnderline
                      value={orderInfo.apartment}
                      setValue={(text) =>
                        setOrderInfo({ ...orderInfo, apartment: text })
                      }
                      placeholder={i18n.t('orderingApartmentInput')}
                    />
                  </Box>
                </Box>
                <Center mt={5}>
                  <TouchableOpacity
                    onPress={saveAddress}
                    style={[styles.joinFromListBtn, { width: 240 }]}
                  >
                    <Text>{i18n.t('orderingSaveAddress')}</Text>
                  </TouchableOpacity>
                  <Center mt='30px'>
                    <TouchableOpacity
                      onPress={() => {
                        if (!orderAddress?.curLocName) {
                          onAlert('Выберите адрес доставки!');
                          return;
                        }
                        if (!existAddress()) {
                          onAlert(i18n.t('orderingNoOrderInfoAlert'));
                          return;
                        }
                        setTab(tab + 1);
                      }}
                      style={styles.submitBtn}
                    >
                      <Text textAlign='center' color='#fff'>
                        {i18n.t('orderingProceedOrderBtn')}
                      </Text>
                    </TouchableOpacity>
                  </Center>
                </Center>
              </Box>
            )}
            {tab === 2 && (
              <Box mt='30px'>
                <Box>
                  <BlockLabel label={i18n.t('orderingOrderList')} />
                  <Box px={1}>
                    {orderList.length
                      ? orderList.map((el) => (
                          <OrderingItem key={el.id} item={el} />
                        ))
                      : null}
                  </Box>
                </Box>
                <OrderDetails hideOrderBtn={true} order={orderList} />
                <Box mt='30px'>
                  <BlockLabel label={i18n.t('orderingYourComment')} />
                  <TextArea
                    value={orderInfo.comment}
                    onChangeText={(text) =>
                      setOrderInfo({ ...orderInfo, comment: text })
                    }
                    h={24}
                    placeholder={i18n.t('orderingWriteComment')}
                  />
                </Box>
                <ProceedOrderBtn tab={tab} setTab={setTab} />
                <BackTabBtn
                  label={i18n.t('orderingBackToAddressButton')}
                  setTab={setTab}
                />
              </Box>
            )}
            {tab === 3 && (
              <Box mt='30px'>
                <Box>
                  <BlockLabel label={i18n.t('orderingPaymentMethod')} />
                  <Box>
                    <Text fontSize={14} color={propStyles.shadowColor}>
                      {i18n.t('orderingJoinPaymentMethod')}
                    </Text>
                  </Box>
                  <DeliveryMethodRadio
                    value={orderInfo.paymentMethod}
                    setValue={(value) =>
                      setOrderInfo({ ...orderInfo, paymentMethod: value })
                    }
                    radioData={radioPaymentMethodList}
                  />
                </Box>
                <AddCoupon setCouponStock={setCouponStock} />

                <TouchableOpacity
                  onPress={() => setShowBonusesAction(true)}
                  style={styles.useBonusesBtn}
                >
                  <Box>
                    <Text fontSize={15} color={propStyles.shadowColor}>
                      {i18n.t('orderingUseBonuses')}
                    </Text>
                  </Box>
                  <Flex direction='row' justify='flex-end' align='center'>
                    <Box mr={2}>
                      <MaterialIcons
                        name='add-task'
                        size={24}
                        color={'#FECC1A'}
                      />
                    </Box>
                    <Box>
                      <Text color={propStyles.shadowColor}>
                        {bonuses?.user || 0}
                      </Text>
                    </Box>
                  </Flex>
                </TouchableOpacity>
                {/* orderDetails */}
                <OrderDetails
                  hideOrderBtn={true}
                  hideTotalPrice={true}
                  order={orderList}
                />
                <Box px='14px'>
                  {!!deliveryPrice && (
                    <OrderDetailLine
                      text='Стоимость доставки'
                      price={deliveryPrice}
                    />
                  )}
                  {useBonuses > 0 && (
                    <OrderDetailLine text='Бонусов' price={useBonuses} />
                  )}
                  <OrderDetailLine
                    text='Всего'
                    price={
                      orderTotalPrice() +
                        orderAdditItemsPrice() +
                        deliveryPrice || 0
                    }
                  />
                  {couponStock || useBonuses ? (
                    <OrderDetailLine
                      text='Стоимость со скидкой'
                      price={getOrderTotalPriceWithStocks()}
                    />
                  ) : null}
                </Box>
                {/*  */}
                <Center mt={'30px'}>
                  <TouchableOpacity
                    onPress={submitOrder}
                    style={styles.submitOrderBtn}
                  >
                    <Text color='#fff'>
                      {i18n.t('orderingSubmitOrderButton')}
                    </Text>
                  </TouchableOpacity>
                </Center>
                <BackTabBtn
                  label={i18n.t('orderingBackToOrderDetails')}
                  setTab={setTab}
                />
              </Box>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
      <BonusesActionSheet
        bonusesData={bonuses}
        bonuses={useBonuses}
        setBonuses={setUseBonuses}
        open={showBonusesAction}
        setOpen={setShowBonusesAction}
      />
    </>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    alignItems: 'center',
    backgroundColor: '#000',
    width: 240,
    borderRadius: 6,
    paddingVertical: 12,
  },
  joinAddressBtn: {
    width: '80%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: propStyles.mainRedColor,
    borderRadius: 6,
    marginVertical: 20,
  },
  joinFromListBtn: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderColor: propStyles.mainRedColor,
    borderWidth: 1,
    borderRadius: 6,
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
    borderRadius: 6,
    paddingVertical: 14,
  },
});

const mapStateToProps = ({ order: { orderList, orderAddress } }) => ({
  orderList,
  orderAddress,
});

const mapDispatchToProps = (dispatch) => ({
  getOrderList: () => dispatch(getOrderList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderingPage);
