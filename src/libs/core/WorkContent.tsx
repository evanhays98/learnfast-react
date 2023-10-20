import { useLogout, useMe } from '../api/src';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CenteredLoader } from './CenteredLoader';

export const WorkContent = () => {
  const { data: me, isLoading } = useMe();
  const { mutate: logout } = useLogout();
  if (isLoading) {
    return <CenteredLoader />;
  }
  if (!me && !isLoading) {
    logout();
  }

  return (
    <Outlet />
  );
};
