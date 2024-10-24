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
import { Route, BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(  // 2ta argument: 1-react, 2-reactDOM instance 
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        < CssBaseline />
        <Router>
          < App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') //reactDOM instance
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
