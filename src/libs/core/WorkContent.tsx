import { useLogout, useMe } from '../api';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CenteredLoader } from './CenteredLoader';
import { Theme } from '../theme';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
}));

export const WorkContent = () => {
  const classes = useStyles();
  const { data: me, isLoading } = useMe();
  const { mutate: logout } = useLogout();
  if (isLoading) {
    return <CenteredLoader />;
  }
  if (!me && !isLoading) {
    logout();
  }

  return (
    <div id="main-container" className={classes.container}>
      <Outlet />
    </div>
  );
};
