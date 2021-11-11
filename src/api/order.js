import axios from './axios';

export const getPickupAddressesReq = async () =>
  await axios.post('/cart/pickup');

export const getDeliveryPriceReq = async (addressData) =>
  await axios.post('/cart/deliveryCost', addressData);

export const getCouponInfoReq = async (coupon) =>
  await axios.post('/cart/useCoupon', { coupon });

export const getUserBonusesReq = async (user_id) =>
  await axios.post('/cart/checkBonuses', { user_id });
