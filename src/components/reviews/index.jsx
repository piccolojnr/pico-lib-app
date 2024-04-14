import React, { useContext, useEffect, useState } from 'react';
import Review from './Review';
import { get_comments } from '../../utils/comment';
import WriteReview from './WriteReview';
import { AuthContext } from '../../context/AuthContext';

function Reviews({ id }) {
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        fetchREeviews()
        // eslint-disable-next-line
    }, [])
    const fetchREeviews = async () => {
        try {
            setLoading(true)
            let response = await get_comments("review", { book_id: id })

            if (response.status === 200)
                setPagination(response.pagination)
            else
                setPagination(null)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const handledeleteReview = (review_id) => {
        setPagination({ ...pagination, items: pagination.items.filter(review => review.id !== review_id) })
    }
    const handleUpdateReview = (review_id, new_review) => {
        setPagination({ ...pagination, items: pagination.items.map(review => review.id === review_id ? new_review : review) })
    }
    return (
        loading || !pagination ? <div>Loading...</div> :
            <div>
                {user &&
                    <WriteReview id={id} onSubmit={fetchREeviews} key={id} />
                }
                <div className='flex flex-wrap items-center justify-center p-4 gap-8'>
                    {pagination.items.map(review => (
                        <Review key={review.id} review={review} handledeleteReview={handledeleteReview} handleUpdateReview={handleUpdateReview} />
                    ))}
                </div>
            </div>
    );
}

export default Reviews;
