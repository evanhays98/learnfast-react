import { Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { Home } from './Home/Home';
import { Register } from './Login/Register';
import React from 'react';
import { Work } from './Work/Work';
import { Content } from '../libs/core/Content';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/*' element={<Content />}>
        <Route path='' element={<Home />} />
      </Route>
      <Route path='/chapter/:id/*' element={<Work />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};