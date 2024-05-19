import React from 'react';
import { Navigate } from 'react-router-dom';

// Private Route Component
export const ProtectedDashboard = ({ children }) => {
  return localStorage.getItem('accessToken') ? children : <Navigate to='/unauthorized' />;
};

// Public Route Component
export const ProtectedAuthRoute = ({ children }) => {
  return localStorage.getItem('accessToken') ? <Navigate to='/dashboard' /> : children;
};



export const ProtectedDashboardRoute = ({ children, allowedUsers }) => {
  const decodedToken = JSON.parse(localStorage.getItem('decodedToken'));

  const userType = decodedToken.user.user;

  if (!allowedUsers.includes(userType)) {
    return <Navigate to='/unauthorized' />;
  }

  return children;
};
