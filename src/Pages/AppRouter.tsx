import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { Home } from './Home/Home';
import { Register } from './Login/Register';
import React from 'react';
import { Work } from './Work/Work';
import { Content } from '../libs/core/Content';
import { Profile } from './User/Profile';
import { WorkContent } from '../libs/core';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/*' element={<Content />}>
        <Route path='' element={<Home />} />
        <Route path='profile' element={<Profile />}></Route>
        <Route path='*' element={<Navigate to='/' replace />}></Route>
      </Route>
      <Route path='/work' element={<WorkContent />}>
        <Route path='' element={<Navigate to='/' replace />}></Route>
        <Route path=':id' element={<Work />} />
        <Route path='*' element={<Navigate to='/' replace />}></Route>
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};