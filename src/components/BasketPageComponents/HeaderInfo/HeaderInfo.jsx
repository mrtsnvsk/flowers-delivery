import React from 'react';

import { Box, Text } from 'native-base';

const HeaderInfo = ({ label }) => {
  return (
    <Box>
      <Text fontSize={20} fontWeight='700'>
        {label}
      </Text>
    </Box>
  );
};

export default HeaderInfo;
