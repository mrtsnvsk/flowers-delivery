import React from 'react';

import { Center, Spinner } from 'native-base';
import propStyles from '../../../resources/propStyles';

const SpinnerFw = () => {
  return (
    <Center flex={1}>
      <Spinner color={propStyles.spinnerColor} />
    </Center>
  );
};

export default SpinnerFw;
