import React, { useEffect, useState } from 'react';
import { confirm_email } from '../../utils/auth'; // Import the API function for confirming email
import { useNavigate } from 'react-router-dom';

function ConfirmEmail() {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        else {
            navigate('/');
        }
    }, [navigate])

    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Call the API to confirm email
            const response = await confirm_email(token, email, password);
            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError(response.error);
            }
        } catch (error) {
            console.error('Error confirming email:', error);
            setError('An error occurred while confirming email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded p-8">
            {success ? (
                <p className="text-green-600">Email confirmed successfully!</p>
            ) : (
                <form onSubmit={handleConfirm} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block mb-2 text-sm font-medium text-gray-900 w-full border rounded-md border-gray-800  h-10 px-2" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block mb-2 text-sm font-medium text-gray-900 w-full border rounded-md border-gray-800  h-10 px-2" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50" disabled={loading}>Confirm Email</button>
                    {error && <p className="text-red-600">{error}</p>}
                </form>
            )}
        </div>
    );
}

export default ConfirmEmail;
