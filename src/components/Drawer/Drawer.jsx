import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Image, Flex, ScrollView } from 'native-base';
import propStyles from '../../resources/propStyles';
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import CallPhoneBlock from '../Elements/CallPhoneBlock';

import { getCategoriesList } from '../../store/actions/categories';

const Drawer = ({ navigation, getCategoriesList, categoriesList }) => {
  const [isOpenMenu, setOpenMenu] = useState(true);

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  const onPushToLink = (el) => {
    navigation.navigate('CatalogPage', { name: el.name, id: el.id });
  };

  const shopLogo =
    'https://florcat.ru/upload/delight.webpconverter/local/templates/florcat/images/logo.png.webp?162728356719376';

  const links = [
    {
      link: 'Категории',
      icon: (
        <MaterialCommunityIcons
          name='flower-tulip-outline'
          size={20}
          color={propStyles.mainRedColor}
        />
      ),
      path: 'CategoriesPage',
    },
    {
      link: 'Контакты',
      icon: (
        <AntDesign name='contacts' size={24} color={propStyles.mainRedColor} />
      ),
      path: 'ContactsPage',
    },
    {
      link: 'Условия доставки',
      icon: (
        <MaterialIcons
          name='delivery-dining'
          size={20}
          color={propStyles.mainRedColor}
        />
      ),
      path: 'СonditionsDeliveryPage',
    },
    {
      path: 'ActivateAppPage',
      link: 'Логин',
      icon: (
        <FontAwesome5
          name='user-alt'
          size={20}
          color={propStyles.mainRedColor}
        />
      ),
    },
  ];
  return (
    <Box h='100%' safeAreaY>
      <ScrollView>
        <Flex
          borderBottomWidth={1}
          borderBottomColor={propStyles.shadowedColor}
          py={2}
          alignItems='center'
        >
          <Image
            width={'100%'}
            height={120}
            source={{ uri: shopLogo }}
            alt='Logo'
          />
        </Flex>
        <Box pl={5}>
          <Box
            borderBottomColor={propStyles.shadowColor}
            borderBottomWidth={1}
            pt={'10%'}
            pb={3}
          >
            <CallPhoneBlock />
            <Box mt={'10%'}>
              {links.map((el, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => navigation.navigate(el.path)}
                  style={{ marginBottom: '10%' }}
                >
                  <Flex key={i} direction='row' alignItems='center'>
                    <Box mr='36px'>{el.icon}</Box>
                    <Box _text={{ fontSize: 18 }}>{el.link}</Box>
                  </Flex>
                </TouchableOpacity>
              ))}
            </Box>
          </Box>
          {/*  */}
          <Box pr={3}>
            <TouchableOpacity
              onPress={() => setOpenMenu(!isOpenMenu)}
              style={{ marginTop: '10%' }}
            >
              <Flex direction='row' justify='space-between' alignItems='center'>
                <Box _text={{ fontSize: 24, fontWeight: '600' }}>Меню</Box>
                <Box>
                  {isOpenMenu ? (
                    <Ionicons
                      name='chevron-up'
                      size={24}
                      color={propStyles.grayColor}
                    />
                  ) : (
                    <Ionicons
                      name='chevron-down'
                      size={24}
                      color={propStyles.grayColor}
                    />
                  )}
                </Box>
              </Flex>
            </TouchableOpacity>
            {isOpenMenu && (
              <>
                {categoriesList.length
                  ? categoriesList.map((el) => (
                      <TouchableOpacity
                        onPress={() => onPushToLink(el)}
                        key={el.id}
                        style={{ marginTop: '10%' }}
                      >
                        <Flex
                          direction='row'
                          justify='space-between'
                          alignItems='center'
                        >
                          <Box _text={{ fontSize: 18 }}>{el.name}</Box>
                          <Box>
                            <Ionicons
                              name='chevron-forward'
                              size={18}
                              color={propStyles.shadowColor}
                            />
                          </Box>
                        </Flex>
                      </TouchableOpacity>
                    ))
                  : null}
              </>
            )}
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = ({ categories: { categoriesList } }) => ({
  categoriesList,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoriesList: () => dispatch(getCategoriesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
