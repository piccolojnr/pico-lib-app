import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { create_comment } from '../../utils/comment';
import SelectRating from '../SelectRating';

function WriteReview({ onSubmit, id }) {
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(1);
    const { user, authToken, refreshAuthToken } = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [loadingCreateRev, setLoadingCreateRev] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingCreateRev(true);
        setError(null);
        try {
            let response;
            response = await create_comment(authToken.auth_token, newReview, "review", rating, { book_id: id, });
            if (response.status === 401) {
                const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                response = await create_comment(refreshedToken.auth.auth_token, newReview, "review", rating, { book_id: id });
            }
            if (response.status === 201) {
                setNewReview('');
                onSubmit();
            }
        } catch (error) {
            console.error('Error creating review:', error);
            setError('Error creatinf review');
        }
        finally {
            setLoadingCreateRev(false);
        }
    };


    return (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg">
            <div className='flex items-center justify-start mb-2'>
                <img className="w-10 h-10 me-4 rounded-full" src={`https://api.dicebear.com/8.x/bottts/svg?seed=${user.email}`} alt={user.email} />
                <h2 className="text-lg font-semibold">Write a Review</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <SelectRating setRating={(v) => setRating(v)} rating={rating} />

                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Write your review here..."
                    rows="5"
                    required
                ></textarea>
                <button
                    disabled={loadingCreateRev}
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {loadingCreateRev ? "loading.." : "Submit Review"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}

export default WriteReview;
