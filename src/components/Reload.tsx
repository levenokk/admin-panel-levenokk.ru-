import { NetworkStatus } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../styles/Reload.module.scss';

interface ReloadProps {
  loading: number;
  refetch: () => void;
}

const Reload: React.FC<ReloadProps> = ({ loading, refetch }) => {
  const clickHandler = () => {
    refetch();
  };

  const className = classNames({
    [styles.rotate]: loading === NetworkStatus.refetch,
  });

  return (
    <IconButton className={className} onClick={clickHandler}>
      <ReplayIcon />
    </IconButton>
  );
};

Reload.propTypes = {
  loading: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Reload;
