import React, { useState, useCallback } from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text, Flex, Center } from 'native-base';
import propStyles from '../../resources/propStyles';
import {
  Foundation,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import RangeSlider from 'rn-range-slider';

const FiltersPage = () => {
  const [isDisplay, setDisplay] = useState('block');
  const [low, setLow] = useState(1490);
  const [high, setHigh] = useState(9800);

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  return (
    <Box p='20px'>
      <Box mt='40px'>
        <Box mb={4}>
          <Text fontSize={18} fontWeight='500'>
            Отображение товаров
          </Text>
        </Box>
        <Flex direction='row' align='center'>
          <TouchableOpacity
            onPress={() => setDisplay('list')}
            style={[
              styles.displayBtn,
              isDisplay === 'list' ? styles.displayBtnActive : null,
            ]}
          >
            <Foundation
              name='list'
              size={24}
              color={
                isDisplay === 'list'
                  ? propStyles.mainRedColor
                  : propStyles.shadowedColor
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisplay('block')}
            style={[
              styles.displayBtn,
              isDisplay === 'block' ? styles.displayBtnActive : null,
            ]}
          >
            <AntDesign
              name='appstore1'
              size={24}
              color={
                isDisplay === 'block'
                  ? propStyles.mainRedColor
                  : propStyles.shadowedColor
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisplay('row')}
            style={[
              styles.displayBtn,
              isDisplay === 'row' ? styles.displayBtnActive : null,
            ]}
          >
            <MaterialCommunityIcons
              name='rectangle'
              size={24}
              color={
                isDisplay === 'row'
                  ? propStyles.mainRedColor
                  : propStyles.shadowedColor
              }
            />
          </TouchableOpacity>
        </Flex>
      </Box>
      <Center mt='40px'>
        <Box mb={3}>
          <Text color='#000' fontSize={19} fontWeight='500'>
            По цене
          </Text>
        </Box>
        <Box mb={5}>
          <Text>
            {low.toFixed(2)} p. - {high.toFixed(2)} p.
          </Text>
        </Box>
        <Box width='90%'>
          <RangeSlider
            min={1490}
            max={9800}
            step={1}
            floatingLabel
            renderThumb={() => <Box style={styles.thumb} />}
            renderRail={() => <Box style={styles.rail} />}
            renderRailSelected={() => <Box style={styles.railSelected} />}
            onValueChanged={handleValueChange}
          />
        </Box>
      </Center>

      <Box mt={'40px'}>
        <Box>
          <Text fontSize={18} fontWeight='500'>
            Характеристики
          </Text>
        </Box>
        <Flex direction='row' wrap='wrap' mt={4}>
          {['ЦВЕТ', 'КОЛИЧЕСТВО ЦВЕТОВ В БУКЕТЕ', 'РАЗМЕР'].map((el) => (
            <TouchableOpacity style={styles.characterSelect}>
              <Text fontSize={14} color={propStyles.grayColor}>
                {el}
              </Text>
            </TouchableOpacity>
          ))}
        </Flex>
      </Box>
      <Center mt={5}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text color='#fff'>Применить</Text>
        </TouchableOpacity>
      </Center>
    </Box>
  );
};

const styles = StyleSheet.create({
  displayBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: propStyles.shadowedColor,
    borderRadius: 12,
    width: 44,
    height: 44,
    marginRight: 20,
  },
  displayBtnActive: {
    backgroundColor: '#E8D0D3',
    borderColor: propStyles.mainRedColor,
  },
  thumb: {
    width: 12 * 2,
    height: 12 * 2,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: propStyles.mainRedColor,
    backgroundColor: propStyles.mainRedColor,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: propStyles.shadowColor,
  },
  railSelected: {
    height: 4,
    backgroundColor: propStyles.mainRedColor,
    borderRadius: 2,
  },
  characterSelect: {
    borderRadius: 9,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: propStyles.shadowedColor,
    marginBottom: 10,
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: 40,
    borderRadius: 4,
    backgroundColor: propStyles.mainRedColor,
  },
});

export default FiltersPage;
