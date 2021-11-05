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
} from '../../store/actions/auth';

import { TextInputMask } from 'react-native-masked-text';
import { onAlert } from '../../resources/utils';
import i18n from 'i18n-js';

const ActivateAppPage = ({
  registerUser,
  isSendedCode,
  updateSmsCode,
  authUser,
  isAuth,
}) => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (isAuth) {
      onPushToLink();
    }
  }, [isAuth]);

  const onPushToLink = () => {
    navigation.navigate('Tabs');
  };

  const sendPhoneNumber = () => {
    phone.length === 15
      ? registerUser(phone)
      : onAlert(i18n.t('activatePhoneWarning'));
  };

  const sendCodeAgain = () => {
    if (!phone) return;

    registerUser(phone);
    onAlert(i18n.t('activateResendedCodeAlert'));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center p='14%' bgColor='#fff' h='100%'>
        <Box mb={2} _text={{ fontSize: 20, textAlign: 'center' }}>
          {i18n.t('activateTitle')}
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
          {i18n.t('activatePresentLabel')}
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
              placeholder={i18n.t('activateInputCodePlaceholder')}
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
                placeholder={i18n.t('activateInputPhonePlaceholder')}
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
              <Text style={styles.activeBtnText}>
                {i18n.t('activateButtonLogin')}
              </Text>
            </TouchableOpacity>
            <Box mt={3}>
              <TouchableOpacity
                style={{ marginBottom: 8 }}
                onPress={sendCodeAgain}
              >
                <Text textAlign='center'>
                  {i18n.t('activateSendCodeAgain')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateSmsCode(null)}>
                <Text textAlign='center'>{i18n.t('activateChangePhone')}</Text>
              </TouchableOpacity>
            </Box>
          </>
        ) : (
          <TouchableOpacity onPress={sendPhoneNumber} style={styles.activeBtn}>
            <Text style={styles.activeBtnText}>
              {i18n.t('activateButtonText')}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onPushToLink} style={{ marginTop: 20 }}>
          <Text
            fontSize={16}
            fontWeight='700'
            color={propStyles.blueActiveColor}
          >
            {i18n.t('activateAppSkip')}
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

const mapStateToProps = ({ auth: { isSendedCode, isAuth } }) => ({
  isSendedCode,
  isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (phone) => dispatch(registerUser(phone)),
  updateSmsCode: (code) => dispatch(updateSmsCode(code)),
  authUser: (code) => dispatch(authUser(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateAppPage);
