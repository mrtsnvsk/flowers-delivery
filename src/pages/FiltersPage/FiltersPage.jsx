import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text, Flex, Center } from 'native-base';
import propStyles from '../../resources/propStyles';

import {
  Foundation,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import RangeSlider from 'rn-range-slider';

import { setCatalogBlockLayout } from '../../store/actions/catalogLayout';
import { setProductPriceDif } from '../../store/actions/product';
import { onAlert } from '../../resources/utils';

const FiltersPage = ({
  setCatalogBlockLayout,
  catalogLayout,
  orderSortProducts,
  setProductPriceDif,
  productPriceFrom,
  productPriceTo,
}) => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(99999);

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const applyFilters = () => {
    setProductPriceDif({ from: low, to: high });
    onAlert('Фильтр применен!');
  };

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
            onPress={() => setCatalogBlockLayout('list')}
            style={[
              styles.displayBtn,
              catalogLayout === 'list' ? styles.displayBtnActive : null,
            ]}
          >
            <Foundation
              name='list'
              size={24}
              color={
                catalogLayout === 'list'
                  ? propStyles.mainRedColor
                  : propStyles.shadowedColor
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCatalogBlockLayout('row')}
            style={[
              styles.displayBtn,
              catalogLayout === 'row' ? styles.displayBtnActive : null,
            ]}
          >
            <AntDesign
              name='appstore1'
              size={24}
              color={
                catalogLayout === 'row'
                  ? propStyles.mainRedColor
                  : propStyles.shadowedColor
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCatalogBlockLayout('block')}
            style={[
              styles.displayBtn,
              catalogLayout === 'block' ? styles.displayBtnActive : null,
            ]}
          >
            <MaterialCommunityIcons
              name='rectangle'
              size={24}
              color={
                catalogLayout === 'block'
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
            {low} p. - {high} p.
          </Text>
        </Box>
        <Box width='93%'>
          <RangeSlider
            min={0}
            max={99999}
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
            <TouchableOpacity key={el} style={styles.characterSelect}>
              <Text fontSize={14} color={propStyles.grayColor}>
                {el}
              </Text>
            </TouchableOpacity>
          ))}
        </Flex>
      </Box>
      <Center mt={5}>
        <TouchableOpacity onPress={applyFilters} style={styles.submitBtn}>
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
    borderRadius: 6,
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
    borderRadius: 6,
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

const mapStateToProps = ({
  catalogLayout: { catalogLayout },
  products: { orderSortProducts, productPriceFrom, productPriceTo },
}) => ({
  catalogLayout,
  orderSortProducts,
  productPriceFrom,
  productPriceTo,
});

const mapDispatchToProps = (dispatch) => ({
  setCatalogBlockLayout: (value) => dispatch(setCatalogBlockLayout(value)),
  setProductPriceDif: (dif) => dispatch(setProductPriceDif(dif)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersPage);
