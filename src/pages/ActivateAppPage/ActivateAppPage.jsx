import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Center, Box, Image, Flex, Text } from 'native-base';
import propStyles from '../../resources/propStyles';

import {
  registerUser,
  updateSmsCode,
  authUser,
  activateApp,
} from '../../store/actions/auth';

import { TextInputMask } from 'react-native-masked-text';

const ActivateAppPage = ({
  registerUser,
  isSendedCode,
  updateSmsCode,
  authUser,
  activateApp,
}) => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const onPushToLink = () => {
    navigation.navigate('Tabs');
  };

  const sendPhoneNumber = () => {
    if (phone) {
      registerUser(phone);
    }
  };

  const handleAuthUser = () => {};

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

        {!!isSendedCode ? (
          <Box mt={5} width='100%'>
            <TextInputMask
              value={code}
              onChangeText={(text) => setCode(text)}
              style={{
                fontSize: 18,
                borderBottomColor: propStyles.shadowColor,
                borderBottomWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 8,
              }}
              placeholder='Код из СМС'
              keyboardType={'number-pad'}
              type='custom'
              options={{
                mask: '999999',
              }}
            />
          </Box>
        ) : (
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
                value={phone}
                onChangeText={(text) => setPhone(text)}
                style={{ fontSize: 18 }}
                placeholder='Ваш номер'
                keyboardType={'number-pad'}
                type='custom'
                options={{
                  mask: '(999) 999-99-99',
                }}
              />
            </Box>
          </Flex>
        )}

        {!!isSendedCode ? (
          <>
            <TouchableOpacity
              onPress={() => authUser(code)}
              style={styles.activeBtn}
            >
              <Text style={styles.activeBtnText}>Войти</Text>
            </TouchableOpacity>
            <Box mt={3}>
              <TouchableOpacity onPress={() => updateSmsCode(null)}>
                <Text>Изменить номер телефона</Text>
              </TouchableOpacity>
            </Box>
          </>
        ) : (
          <TouchableOpacity onPress={sendPhoneNumber} style={styles.activeBtn}>
            <Text style={styles.activeBtnText}>Активировать</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            activateApp(true);
            onPushToLink();
          }}
          style={{ marginTop: 20 }}
        >
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
    borderRadius: 6,
  },
  activeBtnText: {
    color: '#fff',
    fontSize: 18,
  },
});

const mapStateToProps = ({ auth: { isSendedCode } }) => ({ isSendedCode });

const mapDispatchToProps = (dispatch) => ({
  registerUser: (phone) => dispatch(registerUser(phone)),
  updateSmsCode: (code) => dispatch(updateSmsCode(code)),
  authUser: (code) => dispatch(authUser(code)),
  activateApp: (bool) => dispatch(activateApp(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateAppPage);
