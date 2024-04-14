import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { register_user } from '../utils/auth';
import { Helmet } from 'react-helmet';

function Register() {
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

    const register = async (e) => {
        try {
            e.preventDefault();
            setError(null);
            setLoading(true);
            const { email, first_name, last_name, gender, password, password2 } = e.target.elements;
            const user = { email: email.value, first_name: first_name.value, last_name: last_name.value, gender: gender.value, password: password.value, password2: password2.value };

            if (user.password !== user.password2) {
                setError(() => "Passwords do not much")
                setLoading(false)
                return
            }
            const response = await register_user(user);
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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
               <Helmet>
                <title>
                    Register | Pico-Library
                </title>
            </Helmet>
            <div>
                <Link to="" className="flex items-center mb-6 text-2xl font-semibold relative  text-gray-600" style={{ fontFamily: "qualy" }}>
                    Pico-Library
                </Link>
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign up for an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={register} action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                            <input type="first_name" name="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john" required />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
                            <input type="last_name" name="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="doe" required />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <select name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input type="password" name="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <input type="submit"
                            disabled={loading}
                            style={{ backgroundColor: loading ? "#ccc" : "#0ea5e9" }}
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" value={"Sign up"} />
                        {error && <p className="text-red-500 text-sm opacity-60">{error.message}</p>}
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
