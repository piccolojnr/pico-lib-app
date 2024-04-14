import React from 'react'
import { Link } from 'react-router-dom'

function AuthorCard({ author }) {
    const { id, name, birth_date, death_date, alias } = author;
    return (
        <div className="w-64 h-72 overflow-hidden flex flex-col items-start justify-center gap-2 p-4 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/agents/${id}`} className="block mb-2 text-xl font-md line-clamp-3 text-gray-900 dark:text-white hover:underline hover:opacity-75">{name}</Link>
            {
                death_date && birth_date ?
                    <p className="text-gray-700 dark:text-gray-400">Age: {death_date.split("-")[0] - birth_date.split("-")[0]}</p>
                    :
                    <p className="text-gray-700 dark:text-gray-400 ">Age: Unknown</p>
            }
            <p className="text-gray-700 dark:text-gray-400 line-clamp-1">Alias: {alias}</p>
            <Link to={`/books?agent=${id}`} className="mt-2 text-primary-600 hover:underline dark:text-primary-500 line-clamp-1">Books by {name}</Link>
        </div>
    );
}



export default AuthorCard
