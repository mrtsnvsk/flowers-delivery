import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';

import { TouchableOpacity, Switch } from 'react-native';
import { Box, Flex, Center, Text, ScrollView, Image } from 'native-base';
import propStyles from '../../resources/propStyles';
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from '@expo/vector-icons';

import CallPhoneBlock from '../../components/Elements/CallPhoneBlock';
import ListItem from '../../components/ProfilePageComponents/ListItem';
import LanguageActionSheet from '../../components/ProfilePageComponents/LanguageActionSheet';

import { getUserPhone } from '../../resources/utils';
import { logoutUser } from '../../store/actions/auth';
import { switchAppLanguage } from '../../store/actions/localization';

import i18n from 'i18n-js';
import { florcatLogo } from '../../resources/images';

const ProfilePage = ({ isAuth, logoutUser }) => {
  const navigation = useNavigation();
  const [isPushes, setPushes] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [isOpenAS, setShowAS] = useState(false);

  useEffect(() => {
    if (isAuth) {
      (async () => {
        setUserPhone(await getUserPhone());
      })();
    }
  }, [isAuth]);

  const pushToAuth = () => {
    navigation.closeDrawer();
    navigation.navigate('ActivateAppPage');
  };

  const onPushToLink = (link) => {
    navigation.navigate(link);
  };

  return (
    <Box flex={1} bg='#fff' safeAreaTop>
      <ScrollView>
        <Box bgColor='#F9F9F9' px={'20px'}>
          <Center my={'40px'}>
            <Image
              width={300}
              height={110}
              source={florcatLogo}
              alt='Florcat'
            />
          </Center>
          <Box mb={'20px'}>
            <Text color='#000' fontSize={22} fontWeight='400'>
              {i18n.t('profilePrivateArea')}
            </Text>
          </Box>
        </Box>

        <Box p='30px'>
          <CallPhoneBlock />
          {isAuth ? (
            <>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '8%',
                  marginTop: '8%',
                }}
              >
                <Box p={'5px'} mr={4}>
                  <FontAwesome5
                    name='user-alt'
                    size={28}
                    color={propStyles.mainRedColor}
                  />
                </Box>
                <Box>{userPhone}</Box>
              </TouchableOpacity>
              <ListItem
                actionFn={logoutUser}
                icon={
                  <MaterialCommunityIcons
                    name='location-exit'
                    size={28}
                    color={propStyles.mainRedColor}
                  />
                }
                text={i18n.t('profileLogout')}
                noBorder={true}
              />
            </>
          ) : (
            <TouchableOpacity
              onPress={pushToAuth}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '8%',
                marginTop: '8%',
              }}
            >
              <Box p={'5px'} mr={4}>
                <FontAwesome5
                  name='user-alt'
                  size={28}
                  color={propStyles.mainRedColor}
                />
              </Box>
              <Box>{i18n.t('profileAuth')}</Box>
            </TouchableOpacity>
          )}
        </Box>
        <Box px='30px'>
          <Box _text={{ fontSize: 20, color: '#000' }} mb={5}>
            {i18n.t('profileGeneralSetting')}
          </Box>
          <ListItem
            icon={
              <MaterialIcons
                name='language'
                size={28}
                color={propStyles.mainRedColor}
              />
            }
            text={i18n.t('profileLangugage')}
            actionFn={() => setShowAS(true)}
          />
          <ListItem
            icon={
              <AntDesign
                name='hearto'
                size={28}
                color={propStyles.mainRedColor}
              />
            }
            text={i18n.t('profileFavorites')}
            actionFn={() => onPushToLink('FavoritesPage')}
          />
          <ListItem
            icon={
              <Ionicons
                name='notifications'
                size={28}
                color={propStyles.mainRedColor}
              />
            }
            actionFn={() => setPushes((prev) => !prev)}
            text={i18n.t('profileRecieveNotifications')}
            chevron={
              <Switch
                trackColor={{ false: '#767577', true: propStyles.mainRedColor }}
                onValueChange={() => setPushes((prev) => !prev)}
                value={isPushes}
              />
            }
          />
          <ListItem
            icon={
              <MaterialIcons
                name='format-list-bulleted'
                size={24}
                color={propStyles.mainRedColor}
              />
            }
            actionFn={() => onPushToLink('NotificationsPage')}
            text={i18n.t('profileNotifications')}
          />

          <ListItem
            icon={
              <MaterialIcons
                name='history'
                size={24}
                color={propStyles.mainRedColor}
              />
            }
            text={i18n.t('profileOrdersHistory')}
            actionFn={() => onPushToLink('OrderStoriesPage')}
          />
          <ListItem
            icon={
              <MaterialIcons
                name='add-task'
                size={24}
                color={propStyles.mainRedColor}
              />
            }
            actionFn={() => onPushToLink('BonusesPage')}
            text={i18n.t('profileMyBonuses')}
            chevron={
              <Flex direction='row' align='center'>
                <Box mr={2}>0</Box>
                <Box mr={2}>
                  <MaterialIcons name='add-task' size={24} color={'#FECC1A'} />
                </Box>
                <Box>
                  <Entypo
                    name='chevron-right'
                    size={24}
                    color={propStyles.grayColor}
                  />
                </Box>
              </Flex>
            }
          />
          <ListItem
            icon={
              <FontAwesome
                name='users'
                size={24}
                color={propStyles.mainRedColor}
              />
            }
            actionFn={() => onPushToLink('ConfidentialityPage')}
            text={i18n.t('profileConfidentiality')}
          />
        </Box>
      </ScrollView>
      <LanguageActionSheet isOpen={isOpenAS} onClose={() => setShowAS(false)} />
    </Box>
  );
};

const mapStateToProps = ({ auth: { isAuth } }) => ({
  isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  switchAppLanguage: (lng) => dispatch(switchAppLanguage(lng)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
