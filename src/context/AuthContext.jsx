import { React, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { refreshToken } from '../utils/auth';
import { base_api_url } from "../utils/constants";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const authToken = JSON.parse(token);
            setAuthToken(authToken);
            const decoded = jwtDecode(authToken.auth_token);
            const user = {
                id: decoded.sub.public_id,
                email: decoded.sub.email,
                is_admin: decoded.scope.is_admin
            }
            setUser(user);
            refreshAuthToken(authToken.refresh_token)
        }
        else {
            setAuthToken(null);
            setUser(null);
            console.log('No token found');
            return;
        }
        // eslint-disable-next-line
    }, [])

    const isAuthenticated = () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const authToken = JSON.parse(token);
            setAuthToken(authToken);
            const decoded = jwtDecode(authToken.auth_token);
            if (!decoded) {
                setAuthToken(null);
                setUser(null);
                return false;
            }
            const user = {
                id: decoded.sub.public_id,
                email: decoded.sub.email,
                is_admin: decoded.scope.is_admin
            }
            setUser(user);
            return true;
        }
        else {
            setAuthToken(null);
            setUser(null);
            return false;
        }
    }
    const refreshAuthToken = async (refresh_token) => {
        const response = await refreshToken(refresh_token);
        if (response.status === 200) {
            addRefreshedToken(response.data.auth);
            return response.data;
        } else {
            navigate('/login');
            throw new Error('Failed to refresh token');
        }
    };
    const addRefreshedToken = (auth) => {
        setAuthToken(auth);
        const decoded = jwtDecode(auth.auth_token);
        if (!decoded) {
            setAuthToken(null);
            setUser(null);
            return false;
        }
        const user = {
            id: decoded.sub.public_id,
            email: decoded.sub.email,
            is_admin: decoded.scope.is_admin
        }
        setUser(user);
    }



    return (
        <AuthContext.Provider value={{
            isAuthenticated, user, authToken, setAuthToken, setUser, addRefreshedToken, refreshAuthToken, base_api_url,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider };

