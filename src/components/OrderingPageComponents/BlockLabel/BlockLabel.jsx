import React from 'react';

import { Box, Text } from 'native-base';

const BlockLabel = ({ label }) => {
  return (
    <Box mb={3}>
      <Text fontSize={18} fontWeight='500'>
        {label}
      </Text>
    </Box>
  );
};

export default BlockLabel;
