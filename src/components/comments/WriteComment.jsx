import React, { useContext, useState } from 'react'
import { create_comment } from '../../utils/comment';
import { AuthContext } from '../../context/AuthContext';

function WriteComment({ onSubmit, type, id }) {
    const [newComment, setNewComment] = useState('');
    const { user, authToken, refreshAuthToken } = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [loadingCreateComment, setLoadingCreateComment] = useState(false);

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
                onSubmit();
            }
        } catch (error) {
            console.error('Error creating review:', error);
            setError('Error creating review');
        }
        finally {
            setLoadingCreateComment(false);
        }
    };

    return (
        <div className="p-4 mb-4 rounded-lg">
            <div className='flex items-center justify-start mb-2'>
                <img className="w-10 h-10 me-4 rounded-full" src={`https://api.dicebear.com/8.x/bottts/svg?seed=${user.email}`} alt={user.email} />
                <h2 className="text-lg font-semibold capitalize">Write a {type}</h2>
            </div>
            <form onSubmit={handleSubmit} className='w-full relative flex items-start justify-center flex-col'>
                <textarea
                    className="p-2 border border-gray-300 rounded-md mb-2 w-full"
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
        </div>
    )
}

export default WriteComment
