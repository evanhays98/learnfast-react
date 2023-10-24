import { useLogout, useMe } from '../api';
import { NavBar } from './NavBar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CenteredLoader } from './CenteredLoader';

export const Content = () => {
  const { data: me, isLoading } = useMe();
  const { mutate: logout } = useLogout();
  if (isLoading) {
    return <CenteredLoader />;
  }
  if (!me && !isLoading) {
    logout();
  }

  return (
    <NavBar>
      <Outlet />
    </NavBar>
  );
};
