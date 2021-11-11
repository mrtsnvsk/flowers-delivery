import React, { useState } from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Actionsheet,
  Box,
  Text,
  Center,
  Input,
  Icon,
  Pressable,
  Flex,
  KeyboardAvoidingView,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import propStyles from '../../../resources/propStyles';
import { onAlert } from '../../../resources/utils';

const BonusesActionSheet = ({
  open,
  setOpen,
  bonuses,
  setBonuses,
  bonusesData,
}) => {
  const [bonus, setBonus] = useState('0');

  const confirmBonuses = () => {
    if (+bonus > +bonusesData?.max_use_bonuses) {
      onAlert('Кол-во бонусов не может быть больше максимального!');
      setBonus('0');
      return;
    } else if (+bonus > bonusesData?.user) {
      onAlert('Кол-во бонусов не может быть больше вашего бонусного счета!');
      setBonus('0');
      return;
    }

    setBonuses(+bonus);
    setOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Actionsheet isOpen={open} onClose={() => setOpen(false)}>
        <KeyboardAvoidingView behavior={open ? 'padding' : null}>
          <Actionsheet.Content width='100%'>
            <Box px='14px'>
              <Box>
                <Text color={propStyles.mainRedColor} fontSize={18}>
                  Бонусный счет
                </Text>
                <Text
                  color={propStyles.mainRedColor}
                  fontSize={20}
                  fontWeight='bold'
                >
                  {bonusesData?.user}
                </Text>
              </Box>
              <Center width='100%'>
                <Text fontSize={15} my='6px' fontWeight='500'>
                  Оплатить часть покупки бонусами
                </Text>
                <Input
                  value={bonus}
                  onChange={(text) => setBonus(text)}
                  fontSize={18}
                  fontWeight='bold'
                  py='10px'
                  pl='11%'
                  variant='underlined'
                  textAlign='center'
                  isFullWidth
                  keyboardType='number-pad'
                  InputRightElement={
                    <Pressable onPress={() => setBonus('0')}>
                      <Icon
                        as={
                          <MaterialIcons name='clear' size={24} color='black' />
                        }
                        size={5}
                        mr='2'
                      />
                    </Pressable>
                  }
                />
              </Center>
              <Flex
                mt='20px'
                direction='row'
                align='center'
                justify='space-between'
              >
                <TouchableOpacity
                  onPress={() => setBonus('1')}
                  style={styles.applyBonusesValueBtn}
                >
                  <Text>МИНИМУМ</Text>
                  <Text>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setBonus(String(bonusesData?.max_use_bonuses) || '0')
                  }
                  style={styles.applyBonusesValueBtn}
                >
                  <Text>МАКСИМУМ</Text>
                  <Text>{bonusesData?.max_use_bonuses}</Text>
                </TouchableOpacity>
              </Flex>
              <Center>
                {+bonus !== 0 ? (
                  <TouchableOpacity
                    onPress={confirmBonuses}
                    style={styles.bonusesSubmitBtn}
                  >
                    <Text color='#fff' fontWeight='bold' fontSize={18}>
                      Использовать бонусы
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setOpen(false)}
                    style={styles.bonusesSubmitBtn}
                  >
                    <Text color='#fff' fontWeight='bold' fontSize={18}>
                      Отмена
                    </Text>
                  </TouchableOpacity>
                )}
              </Center>
            </Box>
          </Actionsheet.Content>
        </KeyboardAvoidingView>
      </Actionsheet>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  applyBonusesValueBtn: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    width: '48%',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bonusesSubmitBtn: {
    marginTop: 34,
    backgroundColor: propStyles.mainRedColor,
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default BonusesActionSheet;
