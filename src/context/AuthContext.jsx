import { React, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const base_api_url = process.env.REACT_APP_BASE_API_URL;
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
        }
        else {
            setAuthToken(null);
            setUser(null);
            console.log('No token found');
            return;
        }
        // eslint-disable-next-line
    }, [])

    // refresh token
    const refreshToken = () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const authToken = JSON.parse(token);
            const refresh_token = authToken.refresh_token;

            fetch(base_api_url + "auth/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": "Bearer " + refresh_token

                },
            }).then(async res => {
                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message);
                }

                return res.json();
            })
                .then(data => {
                    setAuthToken(data.auth);
                    localStorage.setItem('authToken', JSON.stringify(data.auth));
                    const decoded = jwtDecode(data.auth.auth_token);
                    const user = {
                        id: decoded.sub.public_id,
                        email: decoded.sub.email,
                        is_admin: decoded.scope.is_admin
                    }
                    setUser(user);
                })
                .catch((err) => {
                    console.error('Error:', err);
                    setAuthToken(null);
                    setUser(null);
                    localStorage.removeItem('authToken');
                    navigate('/login');
                })
        }
        else {
            setAuthToken(null);
            setUser(null);
            navigate('/login');
        }
    }
    return (
        <AuthContext.Provider value={{ user, authToken, setAuthToken, setUser, refreshToken, base_api_url }}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider };

