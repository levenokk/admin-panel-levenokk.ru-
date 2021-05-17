import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import Logout from '../components/Logout'
import ChangeTheme from '../components/ToggleTheme'

const Settings: React.FC = () => {
  useEffect(() => {
    document.title = 'Налаштування'
  }, [])
  return (
    <Box>
      <ChangeTheme />
      <Logout />
    </Box>
  )
}

export default Settings
