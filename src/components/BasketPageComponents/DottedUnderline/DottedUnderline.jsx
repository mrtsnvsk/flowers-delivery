import React from 'react';

import { Box } from 'native-base';

const DottedUnderline = () => {
  return (
    <Box style={[{ height: 1, overflow: 'hidden' }]}>
      <Box
        style={[
          {
            height: 2,
            borderWidth: 1,
            borderColor: '#9D9D9E',
            borderStyle: 'dotted',
          },
        ]}
      />
    </Box>
  );
};

export default DottedUnderline;
