import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';



const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [authenticated, setAthenticated] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAuthentication = async () => {
            setAthenticated(isAuthenticated());
            setLoading(false);
        }
        getAuthentication();
        // eslint-disable-next-line 
    }, [authenticated])

    return (
        loading ?
            <h1>LOADING</h1> :
            authenticated ? <Component {...rest} /> :
                <Navigate to="/login" />
    );
}

export default ProtectedRoute;
