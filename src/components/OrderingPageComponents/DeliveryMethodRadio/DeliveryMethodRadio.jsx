import React from 'react';

import { Box, Flex, Radio, Text } from 'native-base';
import propStyles from '../../../resources/propStyles';

const DeliveryMethodRadio = ({ value, setValue, radioData }) => {
  return (
    <Radio.Group
      width='100%'
      value={value}
      onChange={(val) => {
        setValue(val);
      }}
    >
      <>
        {radioData.map((el, i) => (
          <Flex
            borderBottomWidth={1}
            borderBottomColor={propStyles.shadowedColor}
            key={i}
            pl={5}
            align='flex-start'
            width='100%'
            bgColor={value === el.value ? '#f1f1f1' : '#fff'}
            borderRadius={4}
          >
            <Radio
              accessibilityLabel='pick an option'
              colorScheme='secondary'
              value={el.value}
              py={4}
            >
              <Text fontSize={18} ml={5}>
                {el.name}
              </Text>
            </Radio>
          </Flex>
        ))}
      </>
    </Radio.Group>
  );
};

export default DeliveryMethodRadio;
