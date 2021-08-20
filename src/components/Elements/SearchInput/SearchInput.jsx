import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { TextInput, StyleSheet, Dimensions } from 'react-native';
import propStyles from '../../../resources/propStyles';

const { width } = Dimensions.get('window');

import { setShowSearchIcon } from '../../../store/actions/search';

const SearchInput = ({ setShowSearchIcon, isClearSearchInputText }) => {
  const [term, setTerm] = useState('');

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
      style={styles.input}
      onChangeText={(text) => setTerm(text)}
      value={term}
      placeholder='Поиск'
    />
  );
};

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    width: width - 160,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
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
