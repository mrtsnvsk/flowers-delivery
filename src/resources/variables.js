import i18n from 'i18n-js';

export const imgPath = 'https://shop.cit-llc.ru/';

export const radioOrdetToList = [
  {
    name: i18n.t('orderingDoorToDoorDelivery'),
    value: 'delivery',
  },
  {
    name: i18n.t('orderingPickupDelivery'),
    value: 'pickup',
  },
];

export const radioPaymentMethodList = [
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

export const radioAddressat = [
  {
    name: 'Я',
    value: 'user',
  },
  {
    name: 'Другой человек',
    value: 'other',
  },
];
