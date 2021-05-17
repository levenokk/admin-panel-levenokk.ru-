import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Box, FormControlLabel } from '@material-ui/core'
import { RootReducer } from '../redux/store'
import { toggleTheme } from '../redux/app/actions'
import { Theme } from '../redux/app/types'

const ChangeTheme: React.FC = () => {
  const theme = useSelector((state: RootReducer) => state.app.theme)
  const dispatch = useDispatch()
  const [state, setState] = React.useState({
    theme: theme === 'light' ? false : true,
  })

  const changeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ theme: event.target.checked })
    if (event.target.checked) {
      dispatch(toggleTheme(Theme.dark))
      localStorage.setItem('theme', Theme.dark)
    } else {
      dispatch(toggleTheme(Theme.light))
      localStorage.setItem('theme', Theme.light)
    }
  }

  return (
    <Box>
      <FormControlLabel
        control={<Switch color="primary" onChange={changeTheme} checked={state.theme} />}
        label="Темне оформлення"
      />
    </Box>
  )
}

export default ChangeTheme
