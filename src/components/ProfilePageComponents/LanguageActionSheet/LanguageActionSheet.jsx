import React from 'react';
import { connect } from 'react-redux';

import { Actionsheet } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import { switchAppLanguage } from '../../../store/actions/localization';
import { onAlert } from '../../../resources/utils';
import i18n from 'i18n-js';

const LanguageActionSheet = ({
  isOpen,
  onClose,
  language,
  switchAppLanguage,
}) => {
  const changeLanguage = (lng) => {
    onAlert(i18n.t('changeLanguageAlert'));
    switchAppLanguage(lng);
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size='full'>
      <Actionsheet.Content>
        <Actionsheet.Item
          onPress={() => changeLanguage('ru')}
          _text={{ fontWeight: language === 'ru' ? 'bold' : 'normal' }}
          startIcon={<FontAwesome name='language' size={24} color='black' />}
        >
          Русский
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => changeLanguage('en')}
          _text={{ fontWeight: language === 'en' ? 'bold' : 'normal' }}
          startIcon={<FontAwesome name='language' size={24} color='black' />}
        >
          English
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const mapStateToProps = ({ localization: { language } }) => ({
  language,
});

const mapDispatchToProps = (dispatch) => ({
  switchAppLanguage: (lng) => dispatch(switchAppLanguage(lng)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageActionSheet);
