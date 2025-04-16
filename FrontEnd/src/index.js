import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const container = document.getElementById('root');
const root = createRoot(container);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Pink
    },
    background: {
      default: '#fffaf0', // Background color: light yellow
      paper: '#fffaf0', // Card or paper background: light yellow
    },
    text: {
      primary: '#333333', // Primary text color : white
      secondary: '#333333', // Secondary text color : gray
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#ffffff', // Heading 1 color: white
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#ffffff', // Heading 2 color
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#ffffff', // Heading 2 color
    },
    body1: {
      fontSize: '1rem',
      color: '#4B2E1D', // Default body text color : gray
    },
    link: {
      fontSize: '1rem',
      color: '#1976d2',
      textDecoration: 'underline',
    },
  },

  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#1976d2',
          textDecoration: 'underline',
          '&:hover': {
            textDecoration: 'none', // Link hover effect
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#d6d6d6', // Matches theme background : gray
          padding: '0.5rem 1rem',
        },
      },
    },
  },

});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
