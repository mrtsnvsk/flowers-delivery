import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Box, Flex, Text } from 'native-base';
import propStyles from '../../resources/propStyles';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import * as Location from 'expo-location';

import MapView from 'react-native-maps';

import {
  getCurrentLocation,
  getReverseGeocode,
  onAlert,
} from '../../resources/utils';
import useDebounce from '../../hooks/useDebounce';
import { setOrderingAddressTerm } from '../../store/actions/search';
import i18n from 'i18n-js';

const { width, height } = Dimensions.get('window');
const zoom = {
  longitudeDelta: 0.01,
  latitudeDelta: 0.01,
};
import { changeOrderAddress } from '../../store/actions/order';

const MapPage = ({
  isOrderingAddressTerm,
  setOrderingAddressTerm,
  changeOrderAddress,
}) => {
  const debouncedSearch = useDebounce(onSearch, 1000);
  const navigation = useNavigation();

  const [curLoc, setCurLoc] = useState();
  const [curLocName, setCurLocName] = useState('');

  useEffect(() => {
    debouncedSearch(isOrderingAddressTerm);
  }, [isOrderingAddressTerm]);

  useEffect(() => {
    (async () => {
      const {
        coords: { latitude, longitude },
      } = await getCurrentLocation();
      const loc = await getReverseGeocode(latitude, longitude);

      setCurLoc({
        latitude,
        longitude,
        ...zoom,
      });
      setCurLocName(loc);
    })();
  }, [getCurrentLocation]);

  useEffect(() => {
    if (!curLoc?.latitude && !curLoc?.longitude) return;

    (async () => {
      const loc = await getReverseGeocode(curLoc.latitude, curLoc.longitude);
      setCurLocName(loc);
    })();
  }, [curLoc]);

  useEffect(() => {
    return () => {
      setOrderingAddressTerm('');
    };
  }, []);

  const setUserLocation = async () => {
    const {
      coords: { latitude, longitude },
    } = await getCurrentLocation();

    setCurLoc({
      latitude,
      longitude,
      ...zoom,
    });
  };

  async function onSearch() {
    const data = await Location.geocodeAsync(isOrderingAddressTerm);

    if (!data.length) return;
    setCurLoc({ ...data[0], ...zoom });
  }

  const joinAddress = () => {
    if (!curLoc || !curLocName) return onAlert(i18n.t('mapNoAddressAlert'));
    const address = {
      ...curLoc,
      curLocName,
    };
    if (address.curLocName && address.latitude && address.longitude) {
      changeOrderAddress(address);
      navigation.navigate('OrderingPage');
      onAlert('Адрес успешно изменен!');
    } else {
      onAlert(i18n.t('mapNoAddressAlert'));
    }

    // console.log('address', address);
  };

  return (
    <Flex position='relative' direction='column' justify='space-between'>
      <Box>
        <MapView
          onPress={Keyboard.dismiss}
          region={curLoc}
          style={styles.map}
          onRegionChangeComplete={(coords) => setCurLoc(coords)}
        />
        <Box
          style={{
            position: 'absolute',
            top: '49%',
            left: '49%',
            padding: 4,
            borderRadius: 50,
            backgroundColor: '#000',
            borderColor: '#f1f1f1',
            borderWidth: 1,
          }}
        />
        <TouchableOpacity
          onPress={setUserLocation}
          activeOpacity={0.5}
          style={styles.curPositionBtn}
        >
          <MaterialIcons name='my-location' size={28} color='#606161' />
        </TouchableOpacity>
        <Box
          bottom={0}
          position='absolute'
          h='98'
          pb={1}
          py='10px'
          px='20px'
          bg='#fff'
          width={width}
        >
          <Box mb={1}>
            <Text fontWeight='500'>{curLocName}</Text>
          </Box>
          <Flex direction='row' justify='space-between' align='center'>
            <Box>
              <Box>
                <Text color={propStyles.grayColor} fontSize={13}>
                  {i18n.t('mapDeliveryDay')}
                </Text>
              </Box>
              <Box>
                <Text color={propStyles.grayColor} fontSize={13}>
                  {i18n.t('mapDeliveryEvening')}
                </Text>
              </Box>
            </Box>
            <TouchableOpacity onPress={joinAddress}>
              <AntDesign name='arrowright' size={24} color='black' />
            </TouchableOpacity>
          </Flex>
          <Box _text={{ color: propStyles.greenColor, fontSize: 13 }}>
            {i18n.t('mapJoinLocationText')}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

const styles = StyleSheet.create({
  map: {
    width,
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  curPositionBtn: {
    position: 'absolute',
    right: 0,
    bottom: 84,
    right: 14,
    marginBottom: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderRadius: 50,
    ...propStyles.shadowDefault,
  },
});

const mapStateToProps = ({ search: { isOrderingAddressTerm } }) => ({
  isOrderingAddressTerm,
});

const mapDispatchToProps = (dispatch) => ({
  setOrderingAddressTerm: (term) => dispatch(setOrderingAddressTerm(term)),
  changeOrderAddress: (address) => dispatch(changeOrderAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
