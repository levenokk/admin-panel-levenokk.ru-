import { CircularProgress } from '@material-ui/core';
import React from 'react';

import styles from '../styles/Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
