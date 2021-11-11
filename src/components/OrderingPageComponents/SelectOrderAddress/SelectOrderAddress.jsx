import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Select, CheckIcon } from 'native-base';

import { getPickupAddresses } from '../../../store/actions/order';

const SelectOrderAddress = ({
  getPickupAddresses,
  orderPickupAddresses,
  address,
  setAddress,
}) => {
  useEffect(() => {
    getPickupAddresses();
  }, []);

  if (!orderPickupAddresses.length) return null;

  return (
    <Select
      accessibilityLabel='Адрес самовывоза'
      placeholder='Выберите адрес самовывоза'
      onValueChange={(itemValue) => setAddress(itemValue)}
      _selectedItem={{
        endIcon: <CheckIcon size={4} />,
      }}
    >
      {orderPickupAddresses.map((el) => (
        <Select.Item key={el.id} label={el.name} value={el.address} />
      ))}
    </Select>
  );
};

const mapStateToProps = ({ order: { orderPickupAddresses } }) => ({
  orderPickupAddresses,
});

const mapDispatchToProps = (dispatch) => ({
  getPickupAddresses: () => dispatch(getPickupAddresses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectOrderAddress);
