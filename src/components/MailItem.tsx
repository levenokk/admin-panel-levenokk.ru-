import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import ReadMail from './ReadMail';
import RemoveMail from './RemoveMail';

interface MailItemProps {
  email: string;
  name: string;
  id: string;
}

const MailItem: React.FC<MailItemProps> = ({ email, name, id }) => {
  return (
    <Box component='article' marginBottom='10'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box component='h5'>
          {name} | {email}
        </Box>
        <Box display='flex' alignItems='center'>
          <ReadMail id={id} />
          <RemoveMail id={id} />
        </Box>
      </Box>
      <Box component='p' />
    </Box>
  );
};

MailItem.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default MailItem;
