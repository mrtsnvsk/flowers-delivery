import React from 'react';
import { useNavigation } from '@react-navigation/core';

import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Center, Box, Image, Flex, Text } from 'native-base';
import propStyles from '../../resources/propStyles';

import { TextInputMask } from 'react-native-masked-text';

const ActivateAppPage = () => {
  const navigation = useNavigation();

  const onPushToLink = () => {
    navigation.navigate('Tabs');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center p='14%' bgColor='#fff' h='100%'>
        <Box mb={2} _text={{ fontSize: 20, textAlign: 'center' }}>
          Пожалуйста, активируйте приложение
        </Box>
        <Box mb={2}>
          <Image
            width={180}
            height={200}
            source={{
              uri: 'https://sun9-50.userapi.com/impg/TxfHLrGQ4cORUi_ypzbREmFyZjr4uDU2oFumDg/rd_8KL1GmzQ.jpg?size=456x494&quality=96&sign=0cf61b0f9b39191408368d2a63bfa719&type=album',
            }}
            alt='Promo'
          />
        </Box>
        <Box _text={{ textAlign: 'center' }}>
          И получите подарок, если делаете это впервые
        </Box>
        <Flex
          mt={5}
          pb={2}
          width='100%'
          borderBottomWidth={1}
          borderBottomColor={propStyles.shadowColor}
          direction='row'
          justify='center'
          alignItems='center'
        >
          <Center width={'14%'}>
            <Image
              width={41}
              height={8}
              source={{
                uri: 'https://sun9-47.userapi.com/impg/T1PtS15FPhyEhs8XWZaHOeDJlz4hH6CbiXj6vw/D-C2121iRNU.jpg?size=74x50&quality=96&sign=dc387722a8c26f1eace24924d2c0f0bb&type=album',
              }}
              alt='Flag'
            />
          </Center>
          <Center width={'14%'} _text={{ fontSize: 18, fontWeight: '600' }}>
            +7
          </Center>
          <Box width={'72%'}>
            <TextInputMask
              style={{ fontSize: 18 }}
              placeholder='Ваш номер'
              keyboardType={'number-pad'}
              type='custom'
              options={{
                mask: '+7 (999) 999-99-99',
              }}
            />
          </Box>
        </Flex>
        <TouchableOpacity onPress={onPushToLink} style={styles.activeBtn}>
          <Text style={styles.activeBtnText}>Активировать</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPushToLink} style={{ marginTop: 20 }}>
          <Text
            fontSize={16}
            fontWeight='700'
            color={propStyles.blueActiveColor}
          >
            Пропустить этот шаг
          </Text>
        </TouchableOpacity>
      </Center>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  activeBtn: {
    marginTop: 36,
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  activeBtnText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ActivateAppPage;
