import { useLogout, useMe } from '../api/src';
import { NavBar } from './NavBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Content = () => {
  const { data: me, isLoading } = useMe();
  const { mutate: logout } = useLogout();
  if (!me && !isLoading) {
    logout();
  }

  return (
    <NavBar>
      <Outlet />
    </NavBar>
  );
};
