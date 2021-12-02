import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {
  Box,
  Text,
  ScrollView,
  Center,
  TextArea,
  Flex,
  Checkbox,
  KeyboardAvoidingView,
} from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import propStyles from '../../resources/propStyles';

import Tabs from '../../components/OrderingPageComponents/Tabs';
import BlockLabel from '../../components/OrderingPageComponents/BlockLabel';
import DeliveryMethodRadio from '../../components/OrderingPageComponents/DeliveryMethodRadio';
import ProceedOrderBtn from '../../components/OrderingPageComponents/ProceedOrderBtn';
import SelectOrderPickupAddress from '../../components/OrderingPageComponents/SelectOrderPickupAddress';
import InputUnderline from '../../components/Elements/InputUnderline/InputUnderline';
import OrderingItem from '../../components/OrderingPageComponents/OrderingItem';
import AddCoupon from '../../components/BasketPageComponents/AddCoupon';
import BackTabBtn from '../../components/OrderingPageComponents/BackTabBtn';
import OrderDetails from '../../components/BasketPageComponents/OrderDetails/OrderDetails';
import OrderDetailLine from '../../components/OrderingPageComponents/OrderDetailLine/OrderDetailLine';
import DateTimePicker from '../../components/OrderingPageComponents/DateTimePicker';
import TimePickerModal from '../../components/Modals/TimePickerModal';
import DatePickerModal from '../../components/Modals/DatePickerModal';
import BonusesActionSheet from '../../components/OrderingPageComponents/BonusesActionSheet/BonusesActionSheet';
import SelectDeliveryExistTime from '../../components/OrderingPageComponents/SelectDeliveryExistTime';
import OrderAddressesModal from '../../components/Modals/OrderAddressesModal';

import { getOrderList, setOrderList } from '../../store/actions/order';
import {
  getDeliveryPriceReq,
  getUserBonusesReq,
  sendOrderReq,
} from '../../api/order';
import {
  getDayAndMonth,
  getHoursAndMinutes,
  getUserDataFromStorage,
  onAlert,
  onlinePaymentTinkoff,
} from '../../resources/utils';
import {
  radioOrdetToList,
  radioPaymentMethodList,
  radioAddressat,
} from '../../resources/variables';
import i18n, { t } from 'i18n-js';

const OrderingPage = ({
  getOrderList,
  orderList,
  orderAddress,
  setOrderList,
}) => {
  const navigation = useNavigation();
  const curDateTime = new Date();

  // datetime picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showOrderAddressesModal, setShowOrderAddressesModal] = useState(false);

  const [userData, setUserData] = useState(null);
  const [showBonusesAction, setShowBonusesAction] = useState(false);
  const [useBonuses, setUseBonuses] = useState(0);
  const [bonuses, setBonuses] = useState(null);

  const [couponStock, setCouponStock] = useState(null);
  const [tab, setTab] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliveryExistTime, setDeliveryExistTime] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    floor: '',
    apartment: '',
    comment: '',
    note: '',
    orderTo: 'delivery',
    paymentMethod: 'online',
    pickupAddress: '',
    deliveryDate: curDateTime,
    deliveryTime: null,
    isDeliveryExactTime: true,
    // получатель
    recipient: 'user',
    recipientName: '',
    recipientPhone: '',
  });
  // checks
  const otherRecipient = orderInfo.recipient === 'other';
  const isPickup = orderInfo.orderTo === 'pickup';

  useEffect(() => {
    getOrderList();
  }, [getOrderList]);

  useEffect(() => {
    getDeliveryPrice();
  }, [orderAddress, orderList]);

  useEffect(() => {
    (async () => {
      const user = await getUserDataFromStorage();
      console.log('user', user);
      setUserData(user);

      try {
        const { data } = await getUserBonusesReq(user.id);

        setBonuses(data);
      } catch {}
    })();
  }, []);

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

  const onPushToLink = (link) => {
    navigation.navigate(link);
  };

  const existAddress = () => {
    const {
      name,
      phone,
      email,
      city,
      recipient,
      recipientName,
      recipientPhone,
    } = orderInfo;

    const otherRecipient =
      recipient === 'other' && (!recipientName || !recipientPhone);
    const emptyOrderInfo =
      !name ||
      !phone ||
      !email ||
      !city ||
      !orderAddress?.curLocName ||
      otherRecipient;

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

  const submitOrder = async () => {
    if (otherRecipient && orderInfo.paymentMethod !== 'online') {
      onAlert(i18n.t('orderingAlertJoinPaymentMethod'));
      return;
    }

    try {
      const amount =
        orderTotalPrice() + orderAdditItemsPrice() + deliveryPrice || 0;

      const order = {
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
      };
      const { data, status } = await sendOrderReq(order);

      if (status !== 200) {
        throw new Error(data.messgae || i18n.t('orderingOrderSuccess'));
      }

      console.log('data', data);

      if (orderInfo.paymentMethod === 'online') {
        try {
          const payData = {
            amount: getOrderTotalPriceWithStocks(),
            orderId: '',
            title: '',
            description: '',
          };
          const paymentResult = await onlinePaymentTinkoff(payData);

          console.log('paymentResult', paymentResult);
        } catch {
          onAlert(i18n.t('orderingOrderError'));
        }
      } else {
        onAlert(data.messgae || i18n.t('orderingOrderError'));
        navigation.navigate('MainPage');
        setOrderList([]);
      }
    } catch (e) {
      onAlert(e.message);
    }
  };

  return (
    <>
      <Box flex={1} bg='#fff' p='20px' py={2}>
        <Tabs tabId={tab} />
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          keyboardVerticalOffset={80}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* ДОСТАВКА */}
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
                      <SelectOrderPickupAddress
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
                          label={i18n.t('orderingDeliveryDate')}
                          desc={
                            orderInfo.deliveryDate === curDateTime
                              ? i18n.t('orderingJoinDeliveryDate')
                              : getDayAndMonth(orderInfo.deliveryDate)
                          }
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
                        hideChevron={deliveryExistTime ? false : true}
                        desc={
                          deliveryExistTime ? (
                            orderInfo.deliveryTime instanceof Date ? (
                              getHoursAndMinutes(orderInfo.deliveryTime)
                            ) : (
                              i18n.t('orderingJoinDeliveryTime')
                            )
                          ) : (
                            <SelectDeliveryExistTime
                              time={orderInfo.deliveryTime}
                              setTime={(value) =>
                                setOrderInfo({
                                  ...orderInfo,
                                  deliveryTime: value,
                                })
                              }
                            />
                          )
                        }
                        children={
                          deliveryExistTime && (
                            <TimePickerModal
                              show={showTimePicker}
                              setShow={setShowTimePicker}
                              time={orderInfo.deliveryTime}
                              setTime={(time) =>
                                setOrderInfo({
                                  ...orderInfo,
                                  deliveryTime: time,
                                })
                              }
                            />
                          )
                        }
                      />
                      <Checkbox
                        value={deliveryExistTime}
                        onChange={(val) => setDeliveryExistTime(val)}
                        colorScheme={propStyles.mainRedColor}
                        ml={1}
                        mt='24px'
                        defaultIsChecked={false}
                      >
                        {i18n.t('orderingDeliveryExistTime')}
                      </Checkbox>
                    </>
                  )}
                </Box>

                <Center mt='30px'>
                  <TouchableOpacity
                    onPress={() => {
                      if (isPickup && !orderInfo.pickupAddress) {
                        onAlert(i18n.t('orderingAlertJoinPickupAddress'));
                        return;
                      } else if (!orderInfo.deliveryTime && !isPickup) {
                        onAlert(i18n.t('orderingAlertJoinDeliveryTime'));
                        return;
                      } else if (
                        orderAdditItemsPrice() + orderTotalPrice() < 1500 &&
                        !isPickup
                      ) {
                        onAlert(i18n.t('orderingAlertDeliveryCostMore1500'));
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
              </>
            )}
            {/* АДРЕС */}
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
                    type='phone-pad'
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
                    type='email-address'
                  />
                </Box>
                {orderAddress?.curLocName && !isPickup && (
                  <Box>
                    <Text fontSize={14} color='#A7A7A7'>
                      {i18n.t('orderingAddress')}: {orderAddress.curLocName}
                    </Text>
                  </Box>
                )}
                {/*  */}
                {!isPickup && (
                  <>
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
                      {/*  */}
                      <TouchableOpacity
                        onPress={() => setShowOrderAddressesModal(true)}
                        style={styles.joinFromListBtn}
                      >
                        <Text>{i18n.t('orderingJoinAddress')}</Text>
                      </TouchableOpacity>
                      {/*  */}
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
                          value={orderInfo.floor}
                          setValue={(text) =>
                            setOrderInfo({ ...orderInfo, floor: text })
                          }
                          type='number-pad'
                          placeholder={i18n.t('orderingFloorInput')}
                        />
                      </Box>
                      <Box mb={4}>
                        <InputUnderline
                          value={orderInfo.apartment}
                          setValue={(text) =>
                            setOrderInfo({ ...orderInfo, apartment: text })
                          }
                          type='number-pad'
                          placeholder={i18n.t('orderingApartmentInput')}
                        />
                      </Box>

                      {/* ДЕТАЛИ */}
                      <Box mt='10px'>
                        <BlockLabel
                          label={i18n.t('orderingDeliveryRecipient')}
                        />
                        <DeliveryMethodRadio
                          radioData={radioAddressat}
                          value={orderInfo.recipient}
                          setValue={(value) =>
                            setOrderInfo({ ...orderInfo, recipient: value })
                          }
                        />
                      </Box>
                      {orderInfo.recipient === 'other' && (
                        <Box mt='30px'>
                          <Box mb={4}>
                            <InputUnderline
                              value={orderInfo.recipientName}
                              setValue={(text) =>
                                setOrderInfo({
                                  ...orderInfo,
                                  recipientName: text,
                                })
                              }
                              placeholder={i18n.t('orderingAdditNameInput')}
                            />
                          </Box>
                          <Box mb={4}>
                            <InputUnderline
                              value={orderInfo.recipientPhone}
                              setValue={(text) =>
                                setOrderInfo({
                                  ...orderInfo,
                                  recipientPhone: text,
                                })
                              }
                              type='phone-pad'
                              placeholder={i18n.t('orderingAdditPhoneInput')}
                            />
                          </Box>
                        </Box>
                      )}

                      {/*  */}
                    </Box>
                  </>
                )}
                <Center mt={5}>
                  {/* {!isPickup && (
                    <TouchableOpacity
                      onPress={saveAddress}
                      style={[styles.joinFromListBtn, { width: 240 }]}
                    >
                      <Text>{i18n.t('orderingSaveAddress')}</Text>
                    </TouchableOpacity>
                  )} */}
                  <Center mt='30px'>
                    <TouchableOpacity
                      onPress={() => {
                        if (!orderAddress?.curLocName && !isPickup) {
                          onAlert(i18n.t('orderingJoinDeliveryAddress'));
                          return;
                        } else if (!existAddress() && !isPickup) {
                          onAlert(i18n.t('orderingNoOrderInfoAlert'));
                          return;
                        } else if (
                          (isPickup && !orderInfo.name) ||
                          !orderInfo.phone ||
                          !orderInfo.email
                        ) {
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
                  <BackTabBtn
                    label={i18n.t('orderingBackToDeliveryDetails')}
                    setTab={setTab}
                  />
                </Center>
              </Box>
            )}
            {/* ОПЛАТА */}
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
                {/* comment */}
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
                {/* note */}
                <Box mt='14px'>
                  <BlockLabel label={i18n.t('orderingYourNote')} />
                  <TextArea
                    value={orderInfo.comment}
                    onChangeText={(text) =>
                      setOrderInfo({ ...orderInfo, note: text })
                    }
                    h={24}
                    placeholder={i18n.t('orderingWriteNote')}
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
                    radioData={
                      otherRecipient
                        ? radioPaymentMethodList.filter(
                            (el) => el.value === 'online'
                          )
                        : radioPaymentMethodList
                    }
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
                      text={i18n.t('orderingDeliveryCost')}
                      price={deliveryPrice}
                    />
                  )}
                  {useBonuses > 0 && (
                    <OrderDetailLine
                      text={i18n.t('orderingBonusesCount')}
                      price={useBonuses}
                    />
                  )}
                  <OrderDetailLine
                    text={i18n.t('orderingTotalPrice')}
                    price={
                      orderTotalPrice() +
                        orderAdditItemsPrice() +
                        deliveryPrice || 0
                    }
                  />
                  {couponStock || useBonuses ? (
                    <OrderDetailLine
                      text={i18n.t('orderingTotalPriceWithStock')}
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
      <OrderAddressesModal
        open={showOrderAddressesModal}
        setOpen={setShowOrderAddressesModal}
        userId={userData?.id || null}
        setOrderAddress={(orderAddress) =>
          setOrderInfo({ ...orderInfo, ...orderAddress })
        }
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
  setOrderList: (order) => dispatch(setOrderList(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderingPage);
