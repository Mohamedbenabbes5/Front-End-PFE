import React from 'react';
import { Route, Link, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
    const navigate = useNavigate();

    return isAuthenticated ? (
        <Route {...rest} element={element} />
    ) : (
        <Link to="/login" replace onClick={() => navigate('/login')} />
    );
};

export default ProtectedRoute;