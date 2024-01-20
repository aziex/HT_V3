import { Navigate } from 'react-router-dom';
import { getUserToken } from '../SERVICES/sessions';
//import React from 'react';

export const PrivateRoute = ({ children }: any) => {
  const auth = getUserToken();
  return auth ? children : <Navigate to='/login' />;
};

export const CheckPrivateRoute = ({ children }: any) => {
  const auth = getUserToken();

  return !auth ? children : <Navigate to='/' />;
};
