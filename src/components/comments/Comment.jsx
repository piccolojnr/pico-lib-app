import React, { useContext, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from '../../context/AuthContext';
import { delete_comment, vote_comment } from '../../utils/comment';
import Comments from '.';

function Comment({ comment, handledeleteComment, handleUpdateComment }) {
    const [showReplies, setShowReplies] = useState(false);
    const { user, authToken, refreshAuthToken } = useContext(AuthContext);

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };
    const formatDate = (dateString) => {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    };

    const handleDelete = async () => {
        try {
            let response = await delete_comment(authToken.auth_token, comment.id);
            if (response.status === 401) {
                const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                response = await delete_comment(refreshedToken.auth.auth_token, comment.id);
            }
            if (response.status === 200) {
                handledeleteComment(comment.id);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleVote = async (vote) => {
        try {
            let response = await vote_comment(authToken.auth_token, comment.id, vote);
            if (response.status === 401) {
                const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                response = await vote_comment(refreshedToken.auth.auth_token, comment.id, vote);
            }
            if (response.status === 200) {
                handleUpdateComment(comment.id, response.data.item);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div key={comment.id} className="mb-4 rounded-lg min-w-96 max-w-[900px] ml-auto mr-auto">
            <div className='bg-gray-100 p-4'>
                <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full mr-4">
                        <img className="" src={`https://api.dicebear.com/8.x/bottts/svg?seed=${comment.user_profile.email}`} alt={comment.user_profile.email} />
                    </div>
                    <div>
                        <p className="font-semibold">{comment.user_profile.first_name} {comment.user_profile.last_name}</p>
                        <p className="text-gray-600 text-[9px]">{formatDate(comment.created_at)}</p>
                    </div>
                </div>
                <p className="mb-2">{comment.content}</p>
                <div className="flex items-center justify-between w-full">
                    <div className='flex items-center gap-2'>
                        {
                            user?.public_id === comment.user_profile.public_id ?
                                <>
                                    <button onClick={() => handleVote("upvote")} type="button" className="relative inline-flex items-center text-sm font-medium text-center text-blu text-blue-700 rounded-lg  dark:text-blue-600 dark:hover:text-blue-700 ">
                                        <i className="fa-solid fa-thumbs-up"></i>
                                        <span className="sr-only">Upvotes</span>
                                        {
                                            comment.upvotes > 0 && (
                                                <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 border border-white rounded-full -top-2 -end-2">{comment.upvotes}</div>
                                            )}
                                    </button>
                                    <button onClick={() => handleVote("downvote")} type="button" className="relative inline-flex items-center pt-1 text-sm font-medium text-center text-blu text-blue-700 rounded-lg  dark:text-blue-600 dark:hover:text-blue-700 ">
                                        <i className="fa-solid fa-thumbs-down"></i>
                                        <span className="sr-only">Downvotes</span>
                                        {
                                            comment.downvotes > 0 && (
                                                <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 border border-white rounded-full -top-2 -end-2">{comment.downvotes}</div>
                                            )}
                                    </button>
                                </>
                                :
                                <>
                                    <button disabled type="button" className="relative inline-flex items-center text-sm font-medium text-center text-blu text-blue-700 rounded-lg dark:text-blue-600 dark:hover:text-blue-700 ">
                                        <i className="fa-solid fa-thumbs-up"></i>
                                        <span className="sr-only">Upvotes</span>
                                        {
                                            comment.upvotes > 0 && (
                                                <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 border border-white rounded-full -top-2 -end-2">{comment.upvotes}</div>
                                            )}
                                    </button>
                                    <button disabled type="button" className="relative inline-flex items-center pt-1 text-sm font-medium text-center text-blu text-blue-700 rounded-lg dark:text-blue-600 dark:hover:text-blue-700 ">
                                        <i className="fa-solid fa-thumbs-down"></i>
                                        <span className="sr-only">Downvotes</span>
                                        {
                                            comment.downvotes > 0 && (
                                                <div className="absolute inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 border border-white rounded-full -top-2 -end-2">{comment.downvotes}</div>
                                            )}
                                    </button>
                                </>}
                    </div>
                    <div>

                        <button className="text-gray-600 mr-2" onClick={toggleReplies}>
                            {
                                showReplies ?
                                    <i className="fa-solid fa-xmark"></i>
                                    :
                                    <i className="fa-solid fa-reply"></i>
                            }
                        </button>
                        {/* delete button */}
                        {user?.public_id === comment.user_profile.public_id && <button onClick={handleDelete} className="text-red-500"><i className="fa-solid fa-trash"></i></button>}
                    </div>
                </div>
            </div>
            {showReplies && (
                <div className="ml-12 mt-2">
                    <Comments type="reply" id={comment.id} />
                </div>
            )}
        </div>
    );
}

export default Comment;
