import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { UseRemoveMailMutation } from '../hooks/useMutation'
import { useDispatch } from 'react-redux'
import { notificationAction } from '../redux/app/actions'
import { Note } from '../redux/app/types'

const RemoveMail: React.FC<{ id: string }> = ({ id }) => {
  const [open, setOpen] = React.useState(false)
  const [removeMail, { loading }] = UseRemoveMailMutation()

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRemove = () => {
    removeMail({
      variables: {
        id,
      },
    }).then(() => {
      dispatch(notificationAction('Посилання успiшно видалено', Note.success))
      handleClose()
    })
  }

  return (
    <>
      <IconButton onClick={handleClickOpen} color='secondary'>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Ви дійсно хочете видалити повідомлення ?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Після видалення його не можна буде відновити
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose} color='primary' autoFocus={true}>
            Ні
          </Button>
          <Button disabled={loading} onClick={handleRemove} color='secondary'>
            Так
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

RemoveMail.propTypes = {
  id: PropTypes.string.isRequired,
}

export default RemoveMail
