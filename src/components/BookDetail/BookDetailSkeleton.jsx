import React from 'react';

const BookDetailSkeleton = () => {
    return (
        <div className="max-w-xl mx-auto animate-pulse bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                        <div className="w-40 h-6 bg-gray-300 mb-2"></div>
                        <div className="w-20 h-4 bg-gray-300"></div>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <div className="w-full h-12 bg-gray-300"></div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">License</h3>
                    <div className="w-24 h-4 bg-gray-300"></div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Downloads</h3>
                    <div className="w-16 h-4 bg-gray-300"></div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Publishers</h3>
                    <div className="w-full h-4 bg-gray-300 mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-300"></div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Subjects</h3>
                    <div className="w-full h-4 bg-gray-300 mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-300"></div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Bookshelves</h3>
                    <div className="w-full h-4 bg-gray-300 mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-300"></div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Resources</h3>
                    <div className="w-full h-4 bg-gray-300 mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-300"></div>
                </div>
                <div className="mt-8 text-sm text-gray-500">
                    <p>Created At: <span className="text-gray-700">Loading...</span></p>
                    <p>Updated At: <span className="text-gray-700">Loading...</span></p>
                </div>
            </div>
        </div>
    );
};

export default BookDetailSkeleton;
