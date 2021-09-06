import React from 'react';
import { connect } from 'react-redux';

import { TouchableOpacity } from 'react-native';
import { Flex } from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

import { showSortModal } from '../../../store/actions/modals';

const CatalogHeader = ({ showSortModal }) => {
  return (
    <Flex direction='row' justify='space-between' alignItems='center'>
      <TouchableOpacity
        onPress={() => showSortModal(true)}
        style={{ paddingRight: 20 }}
      >
        <MaterialIcons name='sort' size={24} color='black' />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name='filter' size={24} color='black' />
      </TouchableOpacity>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showSortModal: (bool) => dispatch(showSortModal(bool)),
});

export default connect(null, mapDispatchToProps)(CatalogHeader);
