import PropTypes from 'prop-types'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { notificationAction } from '../redux/app/actions'
import { Note } from '../redux/app/types'
import { UseUpdateImgMutation } from '../hooks/useMutation'
import { logout } from '../utils/logout'

const schema = yup.object().shape({
  url: yup.string().required('Поле не повино бути порожнім'),
})

interface EditImgProps {
  id: string
  url: string
}

const EditImg: React.FC<EditImgProps> = ({ id, url }) => {
  const [open, setOpen] = React.useState(false)
  const [updateImg] = UseUpdateImgMutation()

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        color="primary"
        aria-label="edit picture"
        component="button"
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Редагування фотографії</DialogTitle>
        <Formik
          validationSchema={schema}
          initialValues={{ url }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true)

            updateImg({
              variables: {
                ...values,
                id,
              },
            })
              .then(() => {
                dispatch(notificationAction('Зображення успішно змінено', Note.success))
                handleClose()
              })
              .catch((err) => {
                setSubmitting(false)
                logout(err, dispatch)
              })
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  autoFocus={true}
                  margin="dense"
                  id="text"
                  label="Посилання"
                  type="text"
                  fullWidth={true}
                  name="url"
                  value={values.url}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.url && !!errors.url}
                  helperText={errors.url}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Відміна
                </Button>
                <Button disabled={isSubmitting} color="primary" type="submit">
                  Змінити
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

EditImg.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default EditImg
