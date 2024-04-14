import React from 'react';

function Review({ review }) {
    return (
        <div key={review.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                    <p className="font-semibold">{review.user_profile.first_name} {review.user_profile.last_name}</p>
                    <p className="text-gray-600">{review.created_at}</p>
                </div>
            </div>
            <p className="mb-2">{review.content}</p>
            <div className="flex items-center">
                <button className="text-gray-600 mr-2">{review.upvotes} Upvotes</button>
                <button className="text-gray-600">{review.downvotes} Downvotes</button>
            </div>
        </div>
    );
}

export default Review;
