import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { create_bookmark, delete_bookmark } from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

function BookmarkBook({ book, updateBookMark, deleteBook }) {
    const [isBookmarkOpen, setIsBookmarkOpen] = React.useState(false);
    const [loadingBM, setLoadingBM] = React.useState(false);
    const bookmarks = ["read", "currently reading", "unread", "want to read"]
    const { authToken, refreshAuthToken } = useContext(AuthContext);
    const toggleBookmark = () => {
        setIsBookmarkOpen(!isBookmarkOpen);
    }
    const handleBookmarkSelect = async (bookmark) => {
        setIsBookmarkOpen(false);
        setLoadingBM(true)
        try {
            let response = await create_bookmark(authToken.auth_token, book.id, bookmark.replace(" ", "_").replace(" ", "_"))
            if (response.status === 401) {
                const refreshedToken = refreshAuthToken(authToken.refresh_token);
                response = create_bookmark(refreshedToken.auth.auth_token, book.id, bookmark.replace(" ", "_").replace(" ", "_"))
            }
            if (response.status === 201) {
                updateBookMark(book.id, bookmark)
            }
            else if (response.status === 200) {
                updateBookMark(book.id, bookmark)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingBM(false)
        }
    }
    const handleDeleteBookmark = async () => {
        setIsBookmarkOpen(false);
        try {
            setLoadingBM(true)
            let response = await delete_bookmark(authToken.auth_token, book.id)
            if (response.status === 401) {
                const refreshedToken = refreshAuthToken(authToken.refresh_token);
                response = delete_bookmark(refreshedToken.auth.auth_token, book.id)
            }
            if (response.status === 200) {
                deleteBook()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingBM(false)
        }
    }
    return (
        <div key={book.id} className="flex flex-col 2xs:flex-row items-center w-full h-28 max-2xs:h-auto justify-between max-w-[700px] bg-white border border-gray-200 rounded-lg shadow   dark:border-gray-700 dark:bg-gray-800 ">
            <img className="object-cover rounded-lg   h-40  2xs:h-28 w-full  2xs:w-32" src={book.image} alt="" />
            <div className="flex flex-col justify-between ga p-4 h-full w-full">
                <Link to={`/books/${book.id}`} className='text-blue-600 hover:underline hover:text-blue-700'>
                    <h5 className="mb-2 text-right text-sm font-bold tracking-tight  text-wrap line-clamp-2">{book.title}</h5>
                </Link>
                <p className='dark:text-white text-right'><strong>format: </strong> {book.format}</p>
                {/* <p className='dark:text-white text-right'><strong>bookmark: </strong> <span className='text-red-500 font-bold'>{book.bookmark}</span></p> */}
                <div className="text-right ">
                    <div className='relative flex items-center justify-end gap-2'>
                        <p className='dark:text-white'>
                            <i className="fa-solid fa-bookmark text-blue-500" ></i>
                        </p>
                        <button
                            data-tooltip-target="tooltip-default"
                            onClick={toggleBookmark}
                            className="relative bg-transparent text-blue-500 hover:text-blue-600 focus:outline-none"
                        >
                            {
                                loadingBM ?
                                    <i className="fa-solid fa-spinner animate-spin"></i>
                                    :
                                    book.bookmark
                            }
                            {isBookmarkOpen && (
                                <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-300 shadow-lg rounded-md">
                                    {
                                        bookmarks.map(bookmark => (
                                            <button
                                                key={bookmark}
                                                onClick={() => handleBookmarkSelect(bookmark)}
                                                className={`block w-full py-2 px-4 text-left hover:bg-gray-100 text-xs ${book.bookmark === bookmark ? 'bg-gray-100' : ''}`}
                                            >
                                                {bookmark}
                                            </button>))
                                    }
                                    <button
                                        onClick={handleDeleteBookmark}
                                        className="block w-full py-2 px-4 text-left text-red-500 hover:bg-gray-100 text-xs"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BookmarkBook
