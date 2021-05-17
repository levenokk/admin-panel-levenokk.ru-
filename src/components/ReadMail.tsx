import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const ReadMail: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory();
  return (
    <IconButton
      color='primary'
      onClick={() => {
        history.push(`mail/${id}`);
      }}
    >
      <VisibilityIcon />
    </IconButton>
  );
};

ReadMail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ReadMail;
