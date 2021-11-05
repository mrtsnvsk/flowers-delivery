import React from 'react';

import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Box, Flex, Input, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

import { onAlert } from '../../../resources/utils';

const { width } = Dimensions.get('window');
import i18n from 'i18n-js';

const AddCoupon = ({ setCoupon, coupon }) => {
  const addNewCoupon = () => {
    coupon ? console.log('фыв') : onAlert(i18n.t('couponAlert'));
  };

  return (
    <Flex
      mt='20px'
      direction='row'
      justify='space-between'
      alignItems='center'
      p='14px'
      bg={propStyles.basketBlocksColor}
      borderRadius={6}
    >
      <Box width={width - 200}>
        <Input
          onChangeText={(text) => setCoupon(text)}
          value={coupon}
          placeholder={i18n.t('couponCodePlaceholder')}
          height={45}
          bg='#fff'
          _focus={false}
          autoCapitalize='none'
        />
      </Box>
      <TouchableOpacity onPress={addNewCoupon} style={styles.submitBtn}>
        <Text fontSize={14} color='#000' fontWeight='700'>
          {i18n.t('couponApplyButton')}
        </Text>
      </TouchableOpacity>
    </Flex>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: '#fff',
    color: '#000',
    height: 45,
    borderRadius: 6,
    width: 126,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    ...propStyles.shadowDefault,
  },
});

export default AddCoupon;
