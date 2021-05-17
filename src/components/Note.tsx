import { makeStyles, Snackbar, Theme } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleAlert } from '../redux/app/actions';
import { RootReducer } from '../redux/store';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Note: React.FC = () => {
  const classes = useStyles();
  const open = useSelector((state: RootReducer) => state.app.alert.show);
  const message = useSelector((state: RootReducer) => state.app.alert.message);
  const type = useSelector((state: RootReducer) => state.app.alert.type);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(toggleAlert(false));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Note;
