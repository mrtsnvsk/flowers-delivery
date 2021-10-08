import React from 'react';

import { Box, Text, Flex } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const BonusesPage = () => {
  return (
    <Box flex={1} bg='#fff' p='14px'>
      <Box mt={2} mb='20px' _text={{ fontSize: 18, fontWeight: 'bold' }}>
        Правила бонусной системы
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
        <Text bold>У вас</Text>
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
            <Text bold>0</Text>
          </Box>
          <Box>
            <MaterialIcons name='add-task' size={24} color='black' />
          </Box>
        </Flex>
        <Text bold>бонусов</Text>
      </Flex>
      <Box mt='20px'>
        <Box mb={3}>
          <Text>В приложении работает бонусная система.</Text>
        </Box>
        <Box mb={3}>
          <Text>1 бонус = 1 руб.</Text>
        </Box>
        <Box mb={3}>
          <Text bold>Мы дарим 300 бонусов за регистрацию.</Text>
        </Box>
        <Box mb={3}>
          <Text>
            Начисление бонусов зависит от всех потраченных денег в приложении:
          </Text>
        </Box>
        <Box>
          <Text>
            <Text bold>- 1-й уровень </Text>
            до 20 000 р. начисляются 3%
          </Text>
          <Text>
            <Text bold>- 2-й уровень </Text>
            до 50 000 р. начисляются 5%
          </Text>
          <Text>
            <Text bold>- 3-й уровень </Text>
            от 50 000 р. начисляются 7%
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BonusesPage;
