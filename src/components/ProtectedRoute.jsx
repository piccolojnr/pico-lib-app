import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';



const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />
    );
}

export default ProtectedRoute;
