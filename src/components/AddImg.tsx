import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { UseAddImgMutation } from '../hooks/useMutation';
import { notificationAction } from '../redux/app/actions';
import { Note } from '../redux/app/types';
import { logout } from '../utils/logout';

const schema = yup.object().shape({
  url: yup.string().required("Поле обов'язкове"),
});

const AddImg: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const [addImage] = UseAddImgMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Formik
          validationSchema={schema}
          initialValues={{ url: '' }}
          onSubmit={({ url }, { setSubmitting }) => {
            setSubmitting(true);

            addImage({
              variables: {
                url,
              },
            })
              .then(() => {
                dispatch(
                  notificationAction('Зображення успішно додано', Note.success),
                );
                handleClose();
              })
              .catch((err) => {
                setSubmitting(false);
                logout(err, dispatch);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  autoFocus={true}
                  margin='dense'
                  id='text'
                  label='Посилання'
                  type='text'
                  fullWidth={true}
                  name='url'
                  value={values.url}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.url && !!errors.url}
                  helperText={errors.url}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Відміна
                </Button>
                <Button disabled={isSubmitting} color='primary' type='submit'>
                  Додати
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default memo(AddImg);
