import React from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../theme';

const useStyles = createUseStyles((theme: Theme) => ({
  toastContainer: {
    zIndex: 1000,
    width: theme.marginBase * 40,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.std,
    top: theme.marginBase * 6,
    margin: theme.marginBase * 2,
    '@media (max-width: 600px)': {
      width: '100%',
    },
    border: `1px solid ${'rgba(252,252,252,0.46)'}`,
  },
  toast: {
    '&.Toastify__toast-theme--colored.Toastify__toast--info': {
      backgroundColor: 'transparent',
      background: `-webkit-linear-gradient(20deg, ${'rgba(17,72,112,0.6)'} 0%, ${'rgba(74,105,140,0.6)'} 60%, ${'rgba(49,50,159,0.6)'} 100%)`,
      backdropFilter: 'blur(10px)',
      color: '#f6f3f1',
    },
    '&.Toastify__toast-theme--colored.Toastify__toast--success': {
      backgroundColor: 'transparent',
      background: `-webkit-linear-gradient(180deg, ${'rgba(17,112,75,0.6)'} 0%, ${'rgba(74,140,105,0.6)'} 30%, ${'rgba(13,96,53,0.6)'} 100%)`,
      backdropFilter: 'blur(10px)',
      color: '#f6f3f1',
    },
    '&.Toastify__toast-theme--colored.Toastify__toast--warning': {
      backgroundColor: 'transparent',
      background: `-webkit-linear-gradient(180deg, ${'rgba(217,110,27,0.8)'} 0%, ${'rgba(245,147,79,0.8)'} 30%, ${'rgba(229,121,39,0.8)'} 100%)`,
      backdropFilter: 'blur(10px)',
      color: '#f6f3f1',
    },
    '&.Toastify__toast-theme--colored.Toastify__toast--error': {
      backgroundColor: 'transparent',
      background: `-webkit-linear-gradient(180deg, ${'rgba(112,17,50,0.6)'} 0%, ${'rgba(140,74,86,0.6)'} 30%, ${'rgba(96,13,48,0.6)'} 100%)`,
      backdropFilter: 'blur(10px)',
      color: '#f6f3f1',
    },
  },
  progress: {
    '&.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info': {
      backgroundColor: 'rgba(117,172,201,0.5)',
      backdropFilter: 'blur(10px)',
    },
    '&.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success': {
      backgroundColor: 'rgba(117,201,168,0.5)',
      backdropFilter: 'blur(10px)',
    },
    '&.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning': {
      backgroundColor: 'rgba(234,196,168,0.8)',
      backdropFilter: 'blur(10px)',
    },
    '&.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error': {
      backgroundColor: 'rgba(201,117,146,0.5)',
      backdropFilter: 'blur(10px)',
    },
  },
}));


export const ToastContainer = () => {
  const classes = useStyles({ theme });

  return (
    <ReactToastContainer
      toastClassName={classes.toast}
      progressClassName={classes.progress}
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme='colored'
      pauseOnHover
    />
  );
};