import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import Routes from './components/Routes'
import { useSelector } from 'react-redux'
import { RootReducer } from './redux/store'

const App: React.FC = () => {
  const type = useSelector((state: RootReducer) => state.app.theme)
  const theme = createMuiTheme({
    palette: {
      type,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App
