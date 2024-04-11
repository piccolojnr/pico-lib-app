import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ book }) {
    const { id, image, title, description, } = book;
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-72 max-md:w-52 max-sm:w-48">
            <Link to={`/books/${id ? id : ""}`}>
                {image ?
                    <img className="rounded-t-lg max-h-40 w-full" src={image} alt="" /> :
                    <svg
                        className="w-full h-full rounded-t-lg min-h-20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="100%" height="100%" fill="#868e96"></rect>
                        <text x="38%" y="53%" fill="#dee2e6">No Image</text>
                    </svg>}
            </Link>
            <div className="p-5">
                <Link to={`/books/${id ? id : ""}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 max-md:text-lg min-sm:text-sm">
                        {title ? title : "No Title"}
                    </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                    {description ? description : "No Description"}
                </p>
                <Link to={`/books/${id ? id : ""}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800
                 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>

    )
}

export default BookCard
