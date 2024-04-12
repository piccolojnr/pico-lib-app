import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ book }) {
    const { id, image, title, description } = book;
    return (
        <div className="border border-slate-300 flex flex-col items-center shadow rounded-lg w-64 h-80 max-w-sm dark:bg-gray-800 ">
            <div className='w-full rounded-t-lg'>
                <Link to={`/books/${id ? id : ""}`} className="block">
                    {image ?
                        <img className="rounded-t-lg h-40 w-full" src={image} alt={title ? title : "No Title"} /> :
                        <div className="h-40 bg-gray-300 rounded-t-lg"></div>}
                </Link>
            </div>
            <div className="h-full w-full p-4 flex flex-col items-start justify-between">
                <Link to={`/books/${id ? id : ""}`} className="block">
                    <h5 className="text-md font-md text-gray-900 dark:text-white line-clamp-2">{title ? title : "No Title"}</h5>
                </Link>
                <p className="text-gray-700 text-sm dark:text-gray-400 line-clamp-2">{description ? description : "No Description"}</p>
                <Link to={`/books/${id ? id : ""}`} className="inline-flex items-center px-3 py-2 text-xs font-medium text-white  bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default BookCard
