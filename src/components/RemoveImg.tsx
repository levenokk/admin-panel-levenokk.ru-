import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

import { UseRemoveImgMutation } from '../hooks/useMutation';
import { notificationAction } from '../redux/app/actions';
import { Note } from '../redux/app/types';
import { logout } from '../utils/logout';

interface RemoveImgProps {
  id: string;
}

const RemoveImg: React.FC<RemoveImgProps> = ({ id }) => {
  const [open, setOpen] = React.useState(false);

  const [remove, { loading }] = UseRemoveImgMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const removeImg = () => {
    remove({ variables: { id } })
      .then(() => {
        dispatch(
          notificationAction('Зображення успішно видалено', Note.success),
        );
        handleClose();
      })
      .catch((err) => logout(err, dispatch));
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        color='secondary'
        aria-label='remove picture'
        component='button'
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Ви дійсно хочете видалити зображення ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Після видалення його не можна буде відновити
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={handleClose}
            color='primary'
            autoFocus={true}
          >
            Ні
          </Button>
          <Button disabled={loading} onClick={removeImg} color='secondary'>
            Так
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

RemoveImg.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveImg;
