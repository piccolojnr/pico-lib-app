import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../utils/auth';
import { Helmet } from 'react-helmet';

function Login() {
    const { setAuthToken, setUser } = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken');
        // eslint-disable-next-line
    }, [navigate])

    const login = async (e) => {
        try {

            e.preventDefault();
            setError(null);
            setLoading(true);
            const { email, password } = e.target.elements;
            const response = await login_user(email.value, password.value);
            if (response.status === 200) {
                setAuthToken(response.data.auth);
                localStorage.setItem('authToken', JSON.stringify(response.data.auth));
                const decoded = jwtDecode(response.data.auth.auth_token);
                const user = {
                    id: decoded.sub.public_id,
                    email: decoded.sub.email,
                    is_admin: decoded.scope.is_admin
                }
                setUser(user);
                if (user.is_admin) {
                    navigate('/admin');
                }
                else {
                    navigate('/profile');
                }
            }
            else {
                setError(response.data);
            }

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }




    return (
        <div className=" ">
            <Helmet>
                <title>
                    Login | Pico-Library
                </title>
            </Helmet>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                <Link to="" className="flex items-center mb-6 text-2xl font-semibold  text-gray-600" style={{ fontFamily: "qualy" }}>
                    Pico-Library
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={login} action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                            </div>
                            <button type="submit" disabled={loading}
                                style={{ backgroundColor: loading ? "#ccc" : "#0ea5e9" }}
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            {error && <p className="text-red-500 text-sm opacity-60">{error.message}</p>}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
