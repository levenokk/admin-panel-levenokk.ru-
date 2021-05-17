import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { GET_IMAGES } from '../grapql/query/query';
import { Image, Images } from '../grapql/types';
import { UseAddWorkMutation } from '../hooks/useMutation';
import { notificationAction } from '../redux/app/actions';
import { Note } from '../redux/app/types';
import { logout } from '../utils/logout';

const schema = yup.object().shape({
  url: yup.string().required("Поле обов'язкове"),
  img: yup.string().required("Поле обов'язкове"),
  title: yup.string().required("Поле обов'язкове"),
});

const AddWork: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const { data, loading } = useQuery<Images, null>(GET_IMAGES);
  const images = data?.images || [];

  const [addWork] = UseAddWorkMutation();

  const dispatch = useDispatch();

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
        <DialogTitle id='form-dialog-title'>Додати роботу</DialogTitle>
        <Formik
          validationSchema={schema}
          initialValues={{ url: '', img: '', title: '' }}
          onSubmit={({ url, img, title }, { setSubmitting }) => {
            setSubmitting(true);

            addWork({
              variables: {
                title,
                url,
                img: (images as Image[]).find((i) => i.url === img)!.id,
              },
            })
              .then(() => {
                dispatch(
                  notificationAction('Робота успішно додана', Note.success),
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
                  label='Назва'
                  type='text'
                  fullWidth={true}
                  name='title'
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.title && !!errors.title}
                  helperText={errors.title}
                />
                <FormControl fullWidth={true}>
                  <InputLabel id='img'>Зображення</InputLabel>
                  <Select
                    labelId='img'
                    id='img'
                    value={values.img}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.img && !!errors.img}
                    fullWidth={true}
                    name='img'
                  >
                    {images?.map(({ id, url }) => {
                      return (
                        <MenuItem value={url} key={id}>
                          {url}
                        </MenuItem>
                      );
                    })}
                    {loading && <Box>Завантаження...</Box>}
                  </Select>
                  <img src={values.img} alt='' />
                </FormControl>
                <TextField
                  margin='dense'
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

export default AddWork;
