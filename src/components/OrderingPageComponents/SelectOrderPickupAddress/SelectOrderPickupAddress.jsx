import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Select, CheckIcon } from 'native-base';

import { getPickupAddresses } from '../../../store/actions/order';
import i18n from 'i18n-js';

const SelectOrderPickupAddress = ({
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
      placeholder={i18n.t('selectJoinPickupAddress')}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOrderPickupAddress);
