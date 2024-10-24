import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import './css/index.css';
import theme from './app/MaterialTheme';

ReactDOM.render(  // 2ta argument: 1-react, 2-reactDOM instance 
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        < CssBaseline />
        < App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') //reactDOM instance
);

reportWebVitals();
