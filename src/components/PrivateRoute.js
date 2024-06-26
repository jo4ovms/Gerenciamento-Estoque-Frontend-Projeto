import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/auth.service';

const PrivateRoute = () => {
  const user = AuthService.getCurrentUser();
  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
