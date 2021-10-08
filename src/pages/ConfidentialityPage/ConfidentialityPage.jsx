import React from 'react';

import { Box, Text, Flex, ScrollView } from 'native-base';
import propStyles from '../../resources/propStyles';

const ConfidentialityPage = () => {
  return (
    <Box bg='#fff' flex={1}>
      <ScrollView>
        <Box flex={1} p='14px'>
          <Box>
            <Box>
              <Text fontSize='2xl' bold>
                Обратная связь.
              </Text>
              <Text fontSize='2xl' bold>
                Вопросы и предложения:
              </Text>
            </Box>
            <Box mt={4}>
              <Text color={propStyles.grayColor}>
                Мы приветсвтуем ваши комментарии о работе сайта, нашей политики
                и нашей политике Конфиденциальности. Любые вопросы или
                предложения можно присылать на адрес электронной почты:{' '}
                <Text color='#000'>info@florcat.ru</Text>
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Flex
        pos='absolute'
        bottom={0}
        align='center'
        justify='center'
        h={70}
        bg='#141920'
        w='100%'
      >
        <Text color={propStyles.grayColor}>
          Florcat © 2021. Все права защищены.
        </Text>
      </Flex>
    </Box>
  );
};

export default ConfidentialityPage;
