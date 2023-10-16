import { useMe } from '../api/src';
import { NavBar } from './NavBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Content = () => {
  useMe();

  return (
    <NavBar>
      <Outlet />
    </NavBar>
  );
};