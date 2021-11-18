import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Modal, Box, Text } from 'native-base';
import { getOrderAddressesReq } from '../../../api/order';
import propStyles from '../../../resources/propStyles';

import i18n from 'i18n-js';
import { changeOrderAddress } from '../../../store/actions/order';

const OrderAddressesModal = ({
  open,
  setOpen,
  userId,
  setOrderAddress,
  changeOrderAddress,
}) => {
  const [orderAddresses, setOrderAddresses] = useState([]);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const { data } = await getOrderAddressesReq(userId);
        setOrderAddresses(data);
      } catch {
        setOrderAddresses([]);
      }
    })();
  }, [userId]);

  const joinExistAddress = (address) => {
    setOrderAddress(address);
    changeOrderAddress(address.address);
    setOpen(false);
  };

  return (
    <Modal size='lg' isOpen={open} onClose={() => setOpen(false)}>
      <Modal.Content>
        <Modal.Header>{i18n.t('orderingAddressModalJoinAddress')}</Modal.Header>
        <Modal.CloseButton />
        <Box py='14px' px='10px'>
          {orderAddresses.length ? (
            orderAddresses.map((address, i) => (
              <TouchableOpacity
                style={[
                  styles.addressItem,
                  {
                    borderBottomWidth: orderAddresses.length - 1 !== i ? 1 : 0,
                  },
                ]}
                key={i}
                onPress={() => joinExistAddress(address)}
              >
                <Text fontWeight='500'>{address.address.curLocName}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text textAlign='center'>
              {i18n.t('orderingAddressModalEmptyList')}
            </Text>
          )}
        </Box>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  addressItem: {
    padding: 4,
    borderBottomWidth: 1,
    borderColor: propStyles.shadowedColor,
  },
});

const mapDispatchToProps = (dispatch) => ({
  changeOrderAddress: (address) => dispatch(changeOrderAddress(address)),
});

export default connect(null, mapDispatchToProps)(OrderAddressesModal);
