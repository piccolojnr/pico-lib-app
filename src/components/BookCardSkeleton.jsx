import React from 'react'

function BookCardSkeleton() {
    return (
        <div className="border border-slate-300 dark:bg-gray-800 dark:border-gray-700  shadow rounded-lg w-64 h-80 ">
            <div className="animate-pulse space-y-4 p-4">
                <div className="bg-gray-400 h-40 rounded-lg"></div>
                <div className="space-y-2">
                    <div className="bg-gray-400 h-2 rounded"></div>
                    <div className="bg-gray-400 h-1 rounded"></div>
                    <div className="bg-gray-400 h-1 rounded"></div>
                </div>
                <div className="h-8 bg-gray-400 rounded"></div>
            </div>
        </div>
    )
}

export default BookCardSkeleton
