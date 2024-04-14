import React, { useContext, useEffect } from 'react'
import { get_comments } from '../../utils/comment'
import { useState } from 'react'
import Comment from './Comment'
import { AuthContext } from '../../context/AuthContext'
import CommentSkeleton from './CommentSkeleton'
import WriteComment from './WriteComment'

function Comments({ id, type }) {
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const { user } = useContext(AuthContext)


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
                    <WriteComment onSubmit={fetchComments} type={type} id={id} />
                }
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
