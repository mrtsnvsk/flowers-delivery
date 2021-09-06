import React from 'react';

import { Box, Modal } from 'native-base';

const SortModal = ({ open, setOpen }) => {
  return (
    <>
      <Modal size='md' isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Content>
          <Box>123123123</Box>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SortModal;
