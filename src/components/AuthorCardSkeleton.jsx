import React from 'react'

function AuthorCardSkeleton() {
    return (
        <div className="w-64 h-72 overflow-hidden border border-slate-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 animate-pulse p-4">
            <div className="flex flex-col items-start justify-center gap-8 p-4 h-full">
                <div className="bg-gray-400 h-6 w-3/4 rounded"></div>
                <div className="bg-gray-400 h-4 w-1/2 rounded"></div>
                <div className="bg-gray-400 h-4 w-3/4 rounded"></div>
                <div className="bg-gray-400 h-4 w-1/2 rounded"></div>
            </div>
        </div>
    );
}

export default AuthorCardSkeleton;