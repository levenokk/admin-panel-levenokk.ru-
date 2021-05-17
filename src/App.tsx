import 'bootstrap/dist/css/bootstrap.min.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import Routes from './components/Routes';
import { RootReducer } from './redux/store';

const App: React.FC = () => {
  const type = useSelector((state: RootReducer) => state.app.theme);
  const theme = createMuiTheme({
    palette: {
      type,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
