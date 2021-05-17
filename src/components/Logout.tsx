import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { logoutThunk } from '../redux/app/actions';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const exit = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);
  return (
    <Button variant='contained' color='secondary' onClick={exit}>
      Вийти з системи
    </Button>
  );
};

export default Logout;
