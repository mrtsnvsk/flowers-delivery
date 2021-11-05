import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { TextInput, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

import { setShowSearchIcon } from '../../../store/actions/search';
import i18n from 'i18n-js';

const SearchInput = ({
  setShowSearchIcon,
  isClearSearchInputText,
  w = 140,
  term,
  setTerm,
}) => {
  useEffect(() => {
    term.length ? setShowSearchIcon(false) : setShowSearchIcon(true);
  }, [term]);

  useEffect(() => {
    if (isClearSearchInputText) {
      setTerm('');
    }
  }, [isClearSearchInputText]);

  return (
    <TextInput
      style={[styles.input, { width: width - w }]}
      onChangeText={(text) => setTerm(text)}
      value={term}
      placeholder={i18n.t('searchInput')}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
});

const mapStateToProps = ({ search: { isClearSearchInputText } }) => {
  return {
    isClearSearchInputText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowSearchIcon: (show) => dispatch(setShowSearchIcon(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
