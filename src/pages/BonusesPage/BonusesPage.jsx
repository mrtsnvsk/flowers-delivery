import React, { useEffect, useState } from 'react';

import { Box, Text, Flex } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { getUserDataFromStorage } from '../../resources/utils';
import { getUserBonusesReq } from '../../api/order';

const BonusesPage = () => {
  const [bonuses, setBonuses] = useState(0);

  useEffect(() => {
    (async () => {
      const user = await getUserDataFromStorage();

      if (!user) return;

      const { data } = await getUserBonusesReq(user.id);

      setBonuses(data.user);
    })();
  }, []);

  return (
    <Box flex={1} bg='#fff' p='14px'>
      <Box mt={2} mb='20px' _text={{ fontSize: 18, fontWeight: 'bold' }}>
        {i18n.t('bonusesRules')}
      </Box>
      <Flex
        shadow={2}
        bg='#fff'
        borderRadius='xl'
        direction='row'
        justify='center'
        align='center'
        w='100%'
        h={90}
      >
        <Text bold>{i18n.t('bonusesLabelCount1')}</Text>
        <Flex
          px={5}
          py={2}
          borderRadius='md'
          bg='#FECC1A'
          mx={3}
          direction='row'
          justify='center'
          align='center'
        >
          <Box mr={2}>
            <Text bold>{bonuses}</Text>
          </Box>
          <Box>
            <MaterialIcons name='add-task' size={24} color='black' />
          </Box>
        </Flex>
        <Text bold>{i18n.t('bonusesLabelCount2')}</Text>
      </Flex>
      <Box mt='20px'>
        <Box mb={3}>
          <Text>{i18n.t('bonusesBillSystem')}</Text>
        </Box>
        <Box mb={3}>
          <Text>{i18n.t('bonusesEqually')}</Text>
        </Box>
        <Box mb={3}>
          <Text bold>{i18n.t('bonusesPresent')}</Text>
        </Box>
        <Box mb={3}>
          <Text>{i18n.t('bonusesCalculation')}</Text>
        </Box>
        <Box>
          <Text>
            <Text bold>- {i18n.t('bonusesFirstLevel')} </Text>
            {i18n.t('bonusesFirstBonus')}
          </Text>
          <Text>
            <Text bold>- {i18n.t('bonusesSecondLevel')} </Text>
            {i18n.t('bonusesSecondBonus')}
          </Text>
          <Text>
            <Text bold>- {i18n.t('bonusesThirdLevel')} </Text>
            {i18n.t('bonusesThirdBonus')}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BonusesPage;
