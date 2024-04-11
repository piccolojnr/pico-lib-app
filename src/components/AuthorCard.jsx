import React from 'react'
import { Link } from 'react-router-dom'

function AuthorCard({ author }) {
    const { id, name, birth_date, death_date, alias } = author
    return (

        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
            <Link to={`agents/${id}`} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline hover:opacity-75">{name}</Link>

            <p className="font-normal text-gray-700 dark:text-gray-400">{birth_date} - {death_date}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">{alias}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                <Link to={`agents/${id}/books`} className="text-primary-600 hover:underline dark:text-primary-500">Books</Link>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400"></p>
        </div>
    )
}

export default AuthorCard
