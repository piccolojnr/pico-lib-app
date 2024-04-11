import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import BookCard from '../components/BookCard';

function Books() {
    const { base_api_url } = useContext(AuthContext)
    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: 'Home', url: '/' },
        { name: 'Books', url: '/books' },
    ])
    const [pagination, setPagination] = useState({
        items: [],
        total_pages: 5,
        page: 1,
        has_prev: true,
        has_next: true,
    })
    const navigate = useNavigate();

    // const handlePageChange = (page) => {
    //     const params = new URLSearchParams(window.location.search);
    //     params.set('page', page);
    //     navigate(`?${params.toString()}`);
    // }

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.query.value;
        const page = 1;
        const queryParams = new URLSearchParams({
            query: query,
            page: page
        });
        window.location.href = `?${queryParams.toString()}`;
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('query');
        const page = params.get('page') || 1;
        fetch(`${base_api_url}/books?q=${query}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                const crumbs = [
                    { name: 'Home', url: '/' },
                    { name: 'Books', url: '/books' },
                ]
                if (query) {
                    crumbs.push({ name: query, url: '' });
                }
                setBreadcrumbs(crumbs)

                setPagination(data);
            }).catch(error => {
                console.error(error);
            })
        // eslint-disable-next-line
    }, [navigate])

    return (
        <div className="p-5">
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            {/* Search input */}

            <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" name='query' className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Books..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>


            <h1 className="mb-4 text-2xl">Books</h1>

            {/* Book listings */}
            <div className="flex flex-wrap justify-center gap-4 mb-4 px-4 py-2">
                {/* Implement book listings here */}
                {pagination.items.map((book, index) => (
                    <BookCard book={book} key={index} />
                ))}
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {/* Pagination items */}
                    {/* Implement pagination items here */}
                </ul>
            </nav>
        </div>
    )
}

export default Books
