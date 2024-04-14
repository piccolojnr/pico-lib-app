import React from 'react';

function CommentSkeleton() {
    return (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg animate-pulse">
            <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                    <div className="w-32 h-4 bg-gray-300 mb-1"></div>
                    <div className="w-16 h-3 bg-gray-300"></div>
                </div>
            </div>
            <div className="mb-2">
                <div className="w-full h-3 bg-gray-300 mb-1"></div>
                <div className="w-full h-3 bg-gray-300 mb-1"></div>
                <div className="w-full h-3 bg-gray-300 mb-1"></div>
                <div className="w-3/4 h-3 bg-gray-300"></div>
            </div>
            <div className="flex items-center">
                <div className="w-20 h-6 bg-gray-300 mr-2"></div>
                <div className="w-20 h-6 bg-gray-300"></div>
            </div>
        </div>
    );
}

export default CommentSkeleton;
