import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { delete_comment, vote_comment } from '../../utils/comment';

function Review({ review, handleUpdateReview, handledeleteReview }) {
    const { user, authToken, refreshAuthToken } = useContext(AuthContext)
    const [readMore, setReadMore] = useState(false)

    const handleVote = async (vote) => {
        try {
            let response = await vote_comment(authToken.auth_token, review.id, vote);
            if (response.status === 401) {
                const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                response = await vote_comment(refreshedToken.auth.auth_token, review.id, vote);
            }
            if (response.status === 200) {
                handleUpdateReview(review.id, response.data.item);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async () => {
        try {
            let response = await delete_comment(authToken.auth_token, review.id);
            if (response.status === 401) {
                const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                response = await delete_comment(refreshedToken.auth.auth_token, review.id);
            }
            if (response.status === 200) {
                handledeleteReview(review.id);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const formatDate = (dateString) => {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    };
    return (

        <div className='border-4 border-gray-400 max-w-[700px] rounded-lg  p-4'>
            <article>
                <div className="flex items-center mb-4">
                    <img className="w-10 h-10 me-4 rounded-full" src={`https://api.dicebear.com/8.x/bottts/svg?seed=${review.user_profile.email}`} alt={review.user_profile.email} />
                    <div className="font-medium">
                        <p>{review.user_profile.first_name + " " + review.user_profile.last_name}
                            <time className="block text-sm text-gray-500 ">
                                {
                                    formatDate(review.created_at)
                                }
                            </time>
                        </p>
                    </div>
                </div>
                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    {
                        Array.from({ length: review.rating }, (_, i) => i + 1).map((i) =>
                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        )
                    }
                    {
                        Array.from({ length: 5 - review.rating }, (_, i) => i + 1).map((i) =>
                            <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        )}
                    <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
                </div>
                <p className={`mb-2 text-gray-500 dark:text-gray-400 ${readMore ? "" : "line-clamp-6"}`}>
                    {
                        review.content
                    }
                </p>
                <button
                    onClick={() => setReadMore(!readMore)}
                    className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    {readMore ? "Read less" : "Read more"}
                </button>
                <aside>
                    <div className="flex items-center mt-3">
                        <div className='flex items-center gap-2'>
                            {
                                user?.public_id === review.user_profile.public_id ?
                                    <>
                                        <button onClick={() => handleVote("upvote")} type="button" className="relative inline-flex items-center text-sm font-medium text-center text-blu text-blue-700 rounded-lg  dark:text-blue-600 dark:hover:text-blue-700 ">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <span className="sr-only">Upvotes</span>
                                            {
                                                review.upvotes > 0 && (
                                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 border border-white rounded-full -top-2 -end-2">{review.upvotes}</div>
                                                )}
                                        </button>
                                        <button onClick={() => handleVote("downvote")} type="button" className="relative inline-flex items-center pt-1 text-sm font-medium text-center text-blu text-blue-700 rounded-lg  dark:text-blue-600 dark:hover:text-blue-700 ">
                                            <i className="fa-solid fa-thumbs-down"></i>
                                            <span className="sr-only">Downvotes</span>
                                            {
                                                review.downvotes > 0 && (
                                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 border border-white rounded-full -top-2 -end-2">{review.downvotes}</div>
                                                )}
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button disabled type="button" className="relative inline-flex items-center text-sm font-medium text-center text-blu text-blue-700 rounded-lg dark:text-blue-600 dark:hover:text-blue-700 ">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <span className="sr-only">Upvotes</span>
                                            {
                                                review.upvotes > 0 && (
                                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 border border-white rounded-full -top-2 -end-2">{review.upvotes}</div>
                                                )}
                                        </button>
                                        <button disabled type="button" className="relative inline-flex items-center pt-1 text-sm font-medium text-center text-blu text-blue-700 rounded-lg dark:text-blue-600 dark:hover:text-blue-700 ">
                                            <i className="fa-solid fa-thumbs-down"></i>
                                            <span className="sr-only">Downvotes</span>
                                            {
                                                review.downvotes > 0 && (
                                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 border border-white rounded-full -top-2 -end-2">{review.downvotes}</div>
                                                )}
                                        </button>
                                    </>}
                        </div>
                        <div className='border-gray-200 pl-4 ms-4 border-s md:mb-0 dark:border-gray-600'>
                            {user?.public_id === review.user_profile.public_id && <button onClick={handleDelete} className="text-red-500 "><i className="fa-solid fa-trash"></i></button>}
                        </div>
                    </div>
                </aside>
            </article>
        </div>
    );
}

export default Review;
