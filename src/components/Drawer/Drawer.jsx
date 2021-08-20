import React, { useState } from 'react';

import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Box, Image, Flex, ScrollView } from 'native-base';
import propStyles from '../../resources/propStyles';
import {
  Feather,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';

const Drawer = ({ navigation }) => {
  const [isOpenMenu, setOpenMenu] = useState(false);

  const phone = '+7 (812) 445-12-13';

  const shopLogo =
    'https://florcat.ru/upload/delight.webpconverter/local/templates/florcat/images/logo.png.webp?162728356719376';

  const links = [
    {
      link: 'Магазин',
      icon: (
        <MaterialIcons
          name='add-shopping-cart'
          size={20}
          color={propStyles.mainRedColor}
        />
      ),
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
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
              <Flex direction='row' alignItems='center'>
                <Flex
                  mr={4}
                  p={2}
                  bgColor={propStyles.mainRedColor}
                  borderRadius={50}
                  alignItems='center'
                  justify='center'
                >
                  <Feather name='phone' size={28} color={'#fff'} />
                </Flex>
                <Box>
                  <Box _text={{ fontWeight: '500' }}>{phone}</Box>
                  <Box
                    mt={1}
                    _text={{ color: propStyles.blueActiveColor, fontSize: 14 }}
                  >
                    Позвонить
                  </Box>
                </Box>
              </Flex>
            </TouchableOpacity>
            <Box mt={'10%'}>
              {links.map((el, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => navigation.navigate('ActivateAppPage')}
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
                <TouchableOpacity style={{ marginTop: '10%' }}>
                  <Flex
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                  >
                    <Box _text={{ fontSize: 18 }}>АКЦИИ</Box>
                    <Box>
                      <Ionicons
                        name='chevron-forward'
                        size={18}
                        color={propStyles.shadowColor}
                      />
                    </Box>
                  </Flex>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: '10%' }}>
                  <Flex
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                  >
                    <Box _text={{ fontSize: 18 }}>РОЗЫ</Box>
                    <Box>
                      <Ionicons
                        name='chevron-forward'
                        size={18}
                        color={propStyles.shadowColor}
                      />
                    </Box>
                  </Flex>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: '10%' }}>
                  <Flex
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                  >
                    <Box _text={{ fontSize: 18 }}>ЦВЕТЫ</Box>
                    <Box>
                      <Ionicons
                        name='chevron-forward'
                        size={18}
                        color={propStyles.shadowColor}
                      />
                    </Box>
                  </Flex>
                </TouchableOpacity>
              </>
            )}
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({});

export default Drawer;
