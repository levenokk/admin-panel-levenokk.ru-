import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UseUpdateImgMutation } from '../hooks/useMutation';
import { notificationAction } from '../redux/app/actions';
import { Note } from '../redux/app/types';
import { logout } from '../utils/logout';

interface EditImgProps {
  id: string;
}

const EditImg: React.FC<EditImgProps> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [updateImg, { loading }] = UseUpdateImgMutation();
  const [file, setFile] = useState<File>();

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeImgHandler = () => {
    updateImg({
      variables: {
        id,
        file: file as File,
      },
    })
      .then(() => {
        console.log('here');
        dispatch(notificationAction('Зображення успішно додано', Note.success));
        handleClose();
      })
      .catch((err) => {
        logout(err, dispatch);
      });
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        color='primary'
        aria-label='edit picture'
        component='button'
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Редагування фотографії</DialogTitle>
        <input
          accept='image/*'
          id='file'
          type='file'
          style={{ display: 'none' }}
          onChange={(event: ChangeEvent): void => {
            const target = event.target as HTMLInputElement;

            setFile(target.files![0]);
          }}
        />
        <label htmlFor='file' style={{ width: '100%' }}>
          <Button
            style={{ width: '100%' }}
            component='span'
            variant='contained'
            color='default'
            startIcon={<CloudUploadIcon />}
          >
            Завантажити
          </Button>
        </label>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Відміна
          </Button>
          <Button
            disabled={loading}
            onClick={changeImgHandler}
            color='primary'
            type='submit'
          >
            Змінити
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditImg.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditImg;
