import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { ChangeEvent, memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UseAddImgMutation } from '../hooks/useMutation';
import { notificationAction } from '../redux/app/actions';
import { Note } from '../redux/app/types';
import { logout } from '../utils/logout';

const AddImg: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const [addImage, { loading }] = UseAddImgMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addImgHandler = () => {
    addImage({
      variables: {
        file: file as File,
      },
    })
      .then(() => {
        dispatch(notificationAction('Зображення успішно додано', Note.success));
        handleClose();
      })
      .catch((err) => {
        logout(err, dispatch);
      });
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Додати
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Додати зображення</DialogTitle>
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
            onClick={addImgHandler}
            color='primary'
            type='submit'
          >
            Додати
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(AddImg);
