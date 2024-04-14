import React, { useEffect, useState } from 'react';
import { change_password, change_password_with_token } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function ChangePassword() {
    const { authToken, user, refreshAuthToken } = useContext(AuthContext);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        const emailParam = urlParams.get('email');
        if (tokenParam && emailParam) {
            setToken(tokenParam);
            setEmail(emailParam);
        }
        else if (authToken && user) {
            setEmail(user.email);
        }
        else {
            navigate('/');
        }
    }, [authToken, navigate, user])

    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (newPassword !== confirmPassword) {
                setError("passwords do not match")
                return
            }
            let response;
            if (token) {
                response = await change_password_with_token(token, oldPassword, newPassword)
            } else {
                response = await change_password(authToken.auth_token, oldPassword, newPassword);
                if (response.status === 401 && authToken && !token) {
                    const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                    response = await change_password(refreshedToken.auth.auth_token, oldPassword, newPassword)
                }
            }
            console.log(response)

            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError(response.error);
            }
        } catch (error) {
            console.error('Error :', error);
            setError('An error occurred while changing password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded p-8">
            {success ? (
                <p className="text-green-600">Password Changed successfully!</p>
            ) : (
                <form onSubmit={handleConfirm} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block mb-2 text-sm font-medium text-gray-900 w-full border rounded-md border-gray-800  h-10 px-2" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Old Password:</label>
                        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="block mb-2 text-sm font-medium text-gray-900 w-full border rounded-md border-gray-800  h-10 px-2" required />
                    </div>
                    <div>
                        <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">New Password:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="block mb-2 text-sm font-medium text-gray-900 w-full border rounded-md border-gray-800  h-10 px-2" required />
                    </div>
                    <div>
                        <label htmlFor="new_password2" className="block text-sm font-medium text-gray-700">Confirm New Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block mb-2 text-sm font-medium text-gray-900 w-full border rounded-md border-gray-800  h-10 px-2" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50" disabled={loading}>Confirm</button>
                    {error && <p className="text-red-600">{error}</p>}
                </form>
            )}
        </div>
    );
}

export default ChangePassword;
