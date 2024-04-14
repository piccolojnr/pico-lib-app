import React, { useContext, useEffect } from 'react'
import { get_comments, create_comment } from '../../utils/comment'
import { useState } from 'react'
import Comment from './Comment'
import CommentSkeleton from './CommentSkeleton'
import { AuthContext } from '../../context/AuthContext'

function Comments({ id, type }) {
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [newComment, setNewComment] = useState('');
    const { user, authToken, refreshAuthToken } = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [loadingCreateComment, setLoadingCreateComment] = useState(false);

    useEffect(() => {
        fetchComments()
        // eslint-disable-next-line
    }, [id])
    const fetchComments = async () => {
        try {
            setLoading(true)
            const parent_id = type === "reply" ? id : 0;
            const book_id = type === "comment" ? id : 0;
            let response;
            response = await get_comments(type, { book_id: book_id, parent_id: parent_id })
            if (response.status === 200)
                setPagination(response.pagination)
            else {
                setPagination(null)
                return
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCreateComment(true);
        setError(null);
        try {
            let response;
            const parent_id = type === "reply" ? id : 0;
            const book_id = type === "comment" ? id : 0;
            response = await create_comment(authToken.auth_token, newComment, type, 0, { book_id: book_id, parent_id: parent_id });
            if (response.status === 401) {
                const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                response = await create_comment(refreshedToken.auth.auth_token, newComment, type, 0, { book_id: book_id, parent_id: parent_id });
            }
            if (response.status === 201) {
                setNewComment('');
                await fetchComments();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Error fetching profile');
        }
        finally {
            setLoadingCreateComment(false);
        }
    };



    const onLoadMoreComments = async () => {
        setLoadingMore(true);
        try {
            let response;
            if (type === "comment")
                response = await get_comments(type, { book_id: id }, pagination.page + 1)
            else if (type === "reply") {
                response = await get_comments(type, { parent_id: id }, pagination.page + 1)
            }
            else
                response = await get_comments(type, { book_id: id }, pagination.page + 1)
            if (response.status === 200) {
                setPagination({ ...pagination, items: [...pagination.items, ...response.pagination.items], page: pagination.page + 1, has_next: response.pagination.has_next })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingMore(false);
        }
    }

    const handledeleteComment = (comment_id) => {
        setPagination({ ...pagination, items: pagination.items.filter(comment => comment.id !== comment_id) })
    }
    const handleUpdateComment = (comment_id, new_comment) => {
        setPagination({ ...pagination, items: pagination.items.map(comment => comment.id === comment_id ? new_comment : comment) })
    }

    return (
        loading || !pagination ?
            loading ?
                <>
                    <CommentSkeleton />
                </>
                :
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">{type === "comment" ? "Comments" : "Replies"}</h3>
                </div>
            :
            <div className="mt-8 ">
                <h3 className="text-lg font-semibold mb-4">{type === "comment" ? "Comments" : "Replies"}</h3>
                {user &&
                    <div className="mb-6 p-4 flex">
                        <div className="flex items-start">
                            <img className="w-16 h-16 rounded-full mr-4" src={`https://api.dicebear.com/8.x/bottts/svg?seed=${user.email}`} alt={user.email} />
                        </div>
                        <form onSubmit={handleSubmit} className='w-full relative flex items-start justify-center flex-col'>
                            <textarea
                                className="p-2 border border-gray-300 rounded-md mb-2 w-full max-w-96"
                                placeholder={`Write your ${type}...`}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <button
                                disabled={loadingCreateComment}
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            >
                                {loadingCreateComment ? "loading.." : "Submit"}
                            </button>
                            {error && <p className="text-red-500">{error}</p>}
                        </form>
                    </div>}
                <div className=''>
                    {
                        pagination.items.map((comment, index) => (
                            <Comment comment={comment} key={index} handledeleteComment={handledeleteComment} handleUpdateComment={handleUpdateComment} />
                        ))
                    }
                    {
                        loadingMore ?
                            <>
                                <CommentSkeleton />
                                <CommentSkeleton />
                                <CommentSkeleton />
                            </> :
                            pagination.has_next &&
                            <div className="mt-4">
                                <button
                                    onClick={onLoadMoreComments}
                                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
                                >

                                    Load more
                                </button>
                            </div>
                    }
                </div>
            </div >
    )
}

export default Comments
