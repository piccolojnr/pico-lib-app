import React from 'react'

function Pagination({ page, total_items, has_next, has_prev, handlePageChange }) {
    return (
        <nav className="flex flex-col items-center">
            <span className="text-sm text-gray-700">
                Showing <span className="font-semibold text-gray-900 ">
                    {
                        page === 0 ? 0 : page === 1 ? 1 : page * 10 - 9
                    }
                </span> to <span className="font-semibold text-gray-900">
                    {
                        page * 10 > total_items ? total_items : page * 10
                    }
                </span> of <span className="font-semibold text-gray-900 ">
                    {
                        total_items
                    }
                </span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <button
                    disabled={!has_prev}
                    onClick={() => handlePageChange(page - 1)}
                    className={`flex items-center justify-center px-4 h-10 text-base font-medium
                     text-white
                     ${!has_prev ? 'bg-gray-400 dark:bg-gray-600' : 'bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:bg-gray-800'}
                       rounded-s   dark:border-gray-700 dark:text-gray-400 `}>
                    Prev
                </button>
                <button
                    disabled={!has_next}
                    onClick={() => handlePageChange(page + 1)}
                    className={`flex items-center justify-center px-4 h-10 text-base font-medium
                     text-white
                     ${!has_next ? 'bg-gray-400 dark:bg-gray-600' : 'bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:bg-gray-800'}
                       rounded-e   dark:border-gray-700 dark:text-gray-400 `}>
                    Next
                </button>
            </div>
        </nav>
    )
}

export default Pagination
