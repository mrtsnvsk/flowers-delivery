import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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

const { width } = Dimensions.get('window');

const MapPage = ({ isOrderingAddressTerm, setOrderingAddressTerm }) => {
  const debouncedSearch = useDebounce(onSearch, 1000);

  const [curLoc, setCurLoc] = useState();
  const [curLocName, setCurLocName] = useState('');
  const zoom = {
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  };

  useEffect(() => {
    debouncedSearch(isOrderingAddressTerm);
  }, [isOrderingAddressTerm]);

  useEffect(() => {
    (async () => {
      const {
        coords: { latitude, longitude },
      } = await getCurrentLocation();

      setCurLoc({
        latitude,
        longitude,
        ...zoom,
      });
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
    setCurLoc(data[0]);
  }

  const joinAddress = () => {
    if (!curLoc || !curLocName)
      return onAlert('Введите адрес, чтобы продолжить');

    const address = {
      ...curLoc,
      ...curLocName,
    };

    console.log('address', address);
  };

  return (
    <Box>
      <MapView
        onPress={Keyboard.dismiss}
        region={curLoc}
        style={styles.map}
        onRegionChangeComplete={(coords) => setCurLoc(coords)}
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            padding: 5,
            borderRadius: 50,
            backgroundColor: '#000',
            borderColor: '#f1f1f1',
            borderWidth: 1,
          }}
        />
      </MapView>
      <Box pos='absolute' bottom={0}>
        <TouchableOpacity
          onPress={setUserLocation}
          activeOpacity={0.5}
          style={styles.curPositionBtn}
        >
          <MaterialIcons name='my-location' size={28} color='#606161' />
        </TouchableOpacity>
        <Box height={90} py='10px' px='20px' bg='#fff' width={width}>
          <Box mb={1}>
            <Text fontWeight='500'>{curLocName.name}</Text>
          </Box>
          <Flex direction='row' justify='space-between' align='center'>
            <Box>
              <Box>
                <Text color={propStyles.grayColor} fontSize={13}>
                  Доставка в дневное время 0 p.
                </Text>
              </Box>
              <Box>
                <Text color={propStyles.grayColor} fontSize={13}>
                  Доставка в ночное время 250 p.
                </Text>
              </Box>
            </Box>
            <TouchableOpacity onPress={joinAddress}>
              <AntDesign name='arrowright' size={24} color='black' />
            </TouchableOpacity>
          </Flex>
          <Box _text={{ color: propStyles.greenColor, fontSize: 13 }}>
            Нажмите, чтобы выбрать это местоположение
          </Box>
        </Box>
      </Box>
    </Box>
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
    bottom: 80,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
