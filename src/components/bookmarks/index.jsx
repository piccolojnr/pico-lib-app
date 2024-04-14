import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { get_bookmarked_books } from '../../utils/api';
import BookmarkBook from './BookmarkBook';

function BookmarkedBooks() {
    const [pagination, setPagination] = useState(null);
    const [filter, setFilter] = useState('all'); // Default filter is set to 'all'
    const { authToken, refreshAuthToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBooks(filter);
        // eslint-disable-next-line
    }, []);

    const fetchBooks = async (status = null) => {
        try {
            if (status === "all")
                status = null
            setLoading(true);
            // Fetch bookmarked books from the API
            let response = await get_bookmarked_books(authToken.auth_token, status);

            if (response.status === 401) {
                // Token expired, refresh it
                await refreshAuthToken(authToken.refresh_token);
                response = await get_bookmarked_books(authToken.auth_token, status);
            }
            if (response.status === 200) {
                setPagination(response.pagination);
                return true
            } else {
                console.error('Failed to fetch bookmarks');
                return false
            }
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            return false
        }
        finally {
            setLoading(false)
        }
    };

    const handleFilterChange = async (e) => {
        const status = e.target.value;
        setPagination(null)
        await fetchBooks(status);
        setFilter(status);
    };



    return (
        <div className="mt-8">
            {/* Filter section */}
            <div className="m-4">
                <label htmlFor="filter" className="mr-2">
                    <i className="fa-solid fa-filter"></i>
                </label>

                <select id="filter" disabled={loading} className="border rounded p-1 text-xs lowercase font-semibold" value={filter} onChange={handleFilterChange}>
                    <option value="all">all</option>
                    <option value="read">read</option>
                    <option value="unread">unread</option>
                    <option value="currently_reading">currently reading</option>
                    <option value="want_to_read">want to read</option>
                </select>
            </div>

            {/* Bookmarked books */}
            {
                loading || !pagination ?
                    <div className="flex flex-col items-center justify-center gap-5 p-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center w-full h-full justify-between bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div className="animate-pulse flex-shrink-0 rounded-lg h-40 md:h-auto w-full md:w-32 bg-gray-300"></div>
                                <div className="flex flex-col justify-between gap-4 p-4 h-full w-full">
                                    <div className="animate-pulse h-5 w-2/3 bg-gray-300 rounded"></div>
                                    <div className="animate-pulse h-5 w-1/2 bg-gray-300 rounded"></div>
                                    <div className="animate-pulse h-5 w-3/4 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div> :
                    <div className="flex flex-col items-center justify-center gap-5 p-4">
                        {pagination && pagination.items.map((book) => (
                            <BookmarkBook book={book}
                                updateBookMark={(id, bookmark) => setPagination(prev => {
                                    return {
                                        ...prev,
                                        items: prev.items.map(b => b.id === id ? { ...b, bookmark: bookmark } : b)
                                    }
                                })}
                                deleteBook={() => fetchBooks(filter)} key={book.id} />
                        ))}
                    </div>
            }
        </div>
    );
}

export default BookmarkedBooks;
