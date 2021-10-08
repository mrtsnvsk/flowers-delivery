import React from 'react';

import { StyleSheet } from 'react-native';
import { Flex, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

const PromoPercent = ({ promo }) => {
  if (!promo) return null;

  return (
    <Flex
      alignItems='center'
      justify='center'
      width={52}
      height={30}
      bgColor={propStyles.orangeColor}
      position='absolute'
      top={0}
      left={0}
      borderBottomRightRadius={14}
      borderTopLeftRadius={14}
    >
      <Text>
        {String(promo).length >= 2 ? (
          <>
            <Text
              style={[
                styles.promoText,
                {
                  fontSize: promo >= 10 && promo <= 20 ? 16 : 14,
                },
              ]}
            >
              {promo?.toString().slice(0, 1)}
            </Text>
            <Text
              style={[
                styles.promoText,
                {
                  fontSize: promo >= 10 && promo <= 20 ? 14 : 16,
                },
              ]}
            >
              {promo?.toString().slice(1)}%
            </Text>
          </>
        ) : (
          <Text style={styles.promoText}>{promo}%</Text>
        )}
      </Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  promoText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default PromoPercent;
