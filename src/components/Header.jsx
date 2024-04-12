import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mainMenuOpen, setMainMenuOpen] = useState(false)
    const [currentPath, setCurrentpath] = useState('home')
    const { authToken, user } = useContext(AuthContext);

    const navigate = useNavigate();


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const toggleMainMenu = () => {
        setMainMenuOpen(!mainMenuOpen);
    }
    const menu = [
        { name: "Home", path: "" }, { name: "Books", path: "/books" }, { name: "Agents", path: "/agents" }, { name: "Subjects", path: "/subjects" }, { name: "Bookshelves", path: "bookshelves" }
    ]

    useEffect(() => {
        const currentPath = window.location.pathname.split("/")[1] || "home";
        const currentMenuItem = menu.find((item) => item.name.toLowerCase() === currentPath);
        if (currentMenuItem) {
            setCurrentpath(currentMenuItem.name.toLowerCase());
        }
        else {
            setCurrentpath(null)
        }
        // eslint-disable-next-line
    }, [navigate])

    return (
        <nav className="bg-gray-200 dark:bg-gray-800 w-full">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button onClick={toggleMainMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${mainMenuOpen ? "hidden" : "block"} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className={`${mainMenuOpen ? "block" : "hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link to="/" className="flex flex-shrink-0 items-center font-bold dark:text-white text-xl" style={{ fontFamily: 'qualy' }}>
                            Pico-Library
                        </Link>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-1">
                                {
                                    menu.map((item, index) => (
                                        currentPath === item.name.toLowerCase() ?
                                            <Link to={item.path} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page" key={index}>{item.name}</Link> :
                                            <Link to={item.path} className="dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-md px-3 py-2 text-sm font-medium" key={index}>{item.name}</Link>))
                                }
                            </div>
                        </div>
                    </div>
                    {authToken && user ?
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* <!-- Profile dropdown --> */}
                            <div className="relative ml-3">
                                <div>
                                    <button onClick={toggleMenu}
                                        type="button"
                                        className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        aria-expanded={menuOpen}
                                        id="user-menu-button"
                                        aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={`https://api.dicebear.com/8.x/bottts/svg?seed=${user.email}`} alt="" />
                                    </button>
                                </div>
                                <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0 z-[-10]'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    <div className="block px-4 py-2 text-sm text-gray-700 cursor-default" role="menuitem" tabIndex="-1" id="user-menu-item-0">{user.email}</div>
                                    <Link to={"/profile"} className="block px-4 py-2 text-sm text-gray-700 hover:underline" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                                    <Link to={"/login"} className="block px-4 py-2 text-sm text-gray-700 hover:underline" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</Link>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Link to={"/login"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</Link>
                        </div>
                    }
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            <div className={`sm:hidden ${mainMenuOpen ? "block" : "hidden z-[-5]"}`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {
                        menu.map((item, index) => (
                            currentPath === item.name.toLowerCase() ?
                                <Link to={item.path} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page" key={index}>{item.name}</Link> :
                                <Link to={item.path} className="dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white rounded-md px-3 py-2 text-sm font-medium" key={index}>{item.name}</Link>))
                    }
                </div>
            </div>
        </nav>

    )
}

export default Header