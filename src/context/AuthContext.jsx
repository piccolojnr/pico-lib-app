import { React, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { refreshToken } from '../utils/auth';
import { base_api_url } from "../utils/constants";

// Create a new context for authentication
const AuthContext = createContext();

// Define the AuthProvider component
const AuthProvider = ({ children }) => {
    // Initialize state variables
    const [user, setUser] = useState(null); // User information
    const [authToken, setAuthToken] = useState(null); // Authentication token
    const navigate = useNavigate(); // Hook for navigating between routes

    // Effect hook to run code on component mount
    useEffect(() => {
        // Check if authentication token exists in local storage
        const token = localStorage.getItem("authToken");
        if (token) {
            // Parse the token and set user information and authentication token
            const authToken = JSON.parse(token);
            setAuthToken(authToken);
            const decoded = jwtDecode(authToken.auth_token);
            const user = {
                id: decoded.sub.public_id,
                email: decoded.sub.email,
                is_admin: decoded.scope.is_admin
            }
            setUser(user);
            // Refresh the authentication token
            refreshAuthToken(authToken.refresh_token);
        } else {
            // If no token found, set user and token to null
            setAuthToken(null);
            setUser(null);
            console.log('No token found');
            return;
        }
        // eslint-disable-next-line
    }, []);

    // Function to check if user is authenticated
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
        } else {
            setAuthToken(null);
            setUser(null);
            return false;
        }
    }

    // Function to refresh authentication token
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

    // Function to add refreshed authentication token
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

    // Provide the authentication context to the application
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            authToken,
            setAuthToken,
            setUser,
            addRefreshedToken,
            refreshAuthToken,
            base_api_url,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// Export the authentication context and provider
export { AuthContext, AuthProvider };
