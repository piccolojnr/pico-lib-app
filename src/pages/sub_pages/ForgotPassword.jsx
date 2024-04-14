import React, { useState } from 'react';
import { send_forgot_password_email } from '../../utils/auth'; // Import the API function for confirming email

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true)

        try {
            const response = await send_forgot_password_email(email);
            console.log(response);
            if (response.status === 200) {
                setSuccess(true);
            }
            else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded p-8">
            {success ? (
                <p className="text-green-600">Email sent successfully!</p>
            ) : (
                <form onSubmit={handleConfirm} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block mb-2 text-sm font-medium text-gray-900 w-full border rounded-md border-gray-800  h-10 px-2" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50" disabled={loading}>Send Email</button>
                    {error && <p className="text-red-600">{error}</p>}
                </form>
            )}
        </div>
    );
}

export default ForgotPassword;
