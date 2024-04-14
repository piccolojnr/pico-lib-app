import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CollapsibleSection from './CollapsibleSection';
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from '../../context/AuthContext';
import { get_user_bookmark_books, create_bookmark, delete_bookmark } from '../../utils/api';

const BookDetail = ({ book }) => {
    console.log(book)
    const {
        id,
        title,
        format,
        description,
        license,
        downloads,
        image,
        publishers,
        subjects,
        agents,
        languages,
        bookshelves,
        resources,
        created_at,
        updated_at
    } = book;
    const formatDate = (dateString) => {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    };
    const { authToken, refreshAuthToken } = useContext(AuthContext)
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
    const [loadingBM, setLoadingBM] = useState(false);
    const bookmarks = ["read", "currently reading", "unread", "want to read"]

    useEffect(() => {
        const fetchBookMark = async () => {
            try {
                setLoadingBM(true);
                let response = await get_user_bookmark_books(authToken.auth_token, id)
                if (response.status === 401) {
                    const refreshedToken = await refreshAuthToken(authToken.refresh_token);
                    response = await get_user_bookmark_books(refreshedToken.auth.auth_token, id)
                }
                if (response.status === 200) {
                    const bookmark = response.bookmark
                    setSelectedBookmark(bookmark.status.replace("_", " ").replace("_", " "))
                }
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoadingBM(false);
            }
        }
        if (authToken)
            fetchBookMark()
        // eslint-disable-next-line
    }, [authToken, id])

    const toggleBookmark = () => {
        setIsBookmarkOpen(!isBookmarkOpen);
    };

    const handleBookmarkSelect = async (bookmark) => {
        setIsBookmarkOpen(false);
        setLoadingBM(true)
        try {
            let response = await create_bookmark(authToken.auth_token, id, bookmark.replace(" ", "_").replace(" ", "_"))
            if (response.status === 401) {
                const refreshedToken = refreshAuthToken(authToken.refresh_token);
                response = create_bookmark(refreshedToken.auth.auth_token, id, bookmark.replace(" ", "_").replace(" ", "_"))
            }
            if (response.status === 201) {
                setSelectedBookmark(bookmark.replace("_", " ").replace("_", " "))
            }
            else if (response.status === 200) {
                setSelectedBookmark(bookmark.replace("_", " ").replace("_", " "))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingBM(false)
            setIsBookmarkOpen(false)
        }

    };

    const handleDeleteBookmark = async () => {
        try {
            setLoadingBM(true)
            let response = await delete_bookmark(authToken.auth_token, id)
            if (response.status === 401) {
                const refreshedToken = refreshAuthToken(authToken.refresh_token);
                response = delete_bookmark(refreshedToken.auth.auth_token, id)
            }
            if (response.status === 200) {
                setSelectedBookmark(null)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingBM(false)
            setIsBookmarkOpen(false)
        }
    }
    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg">
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <img className="w-20 h-20 rounded-full mr-4" src={image} alt={title} />
                    <div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p className="text-gray-600">Format: {format}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="text-gray-700">{description || "No description available"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">License</h3>
                    <p className="text-gray-700">
                        <Link target='_blank' to={license} className='text-blue-500 hover:text-blue-700 underline' >
                            {license}
                        </Link>
                    </p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Downloads</h3>
                    <p className="text-gray-700">{downloads}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Publishers</h3>
                    <ul className="list-disc pl-5">
                        {publishers.map(publisher => (
                            <li key={publisher.id}>{publisher.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Languages</h3>
                    <ul className="list-disc pl-5">
                        {languages.map(language => (
                            <li key={language.id}>{language.code}</li>
                        ))}
                    </ul>
                </div>
                <CollapsibleSection title="Agents">
                    <ul className="list-disc pl-5">
                        {agents.map(agent => (
                            <li key={agent.id} className='flex flex-row items-center justify-start gap-4'>
                                <Link to={`/agents/${agent.id}`} className='text-blue-500 hover:text-blue-700 underline'>
                                    {agent.name}
                                </Link>
                                <p className="text-gray-700 pl-4 border-l-2 font-bold border-l-gray-500">{agent.agent_type}</p>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
                <CollapsibleSection title="Subjects">
                    <ul className="list-disc pl-5">
                        {subjects.map(subject => (
                            <li key={subject.id}>
                                <Link to={`/books?subject=${subject.id}`} className='text-blue-500 hover:text-blue-700 underline'>
                                    {subject.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
                <CollapsibleSection title="Bookshelves">
                    <ul className="list-disc pl-5">
                        {bookshelves.map(bookshelf => (
                            <li key={bookshelf.id}>
                                <Link to={`/books?bookshelf=${bookshelf.id}`} className='text-blue-500 hover:text-blue-700 underline'>
                                    {bookshelf.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
                <CollapsibleSection title="Resources">
                    <ul className="list-disc pl-5">
                        {resources.map(resource => (
                            <li key={resource.id}>
                                <Link to={resource.url} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:text-blue-700 underline'>
                                    {resource.url}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
                <div className="p-4 border-t border-gray-200">
                    <div className="relative">
                        <button
                            data-tooltip-target="tooltip-default"
                            onClick={toggleBookmark}
                            className="bg-transparent text-blue-500 hover:text-blue-600 focus:outline-none"
                        >
                            {
                                loadingBM ?
                                    <i className="fa-solid fa-spinner animate-spin"></i>
                                    :
                                    selectedBookmark ?
                                        <i className="fa-solid fa-bookmark"></i>
                                        :
                                        <i className="fa-regular fa-bookmark"></i>
                            }
                        </button>
                        {isBookmarkOpen && (
                            <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-300 shadow-lg rounded-md">
                                {
                                    bookmarks.map(bookmark => (
                                        <button
                                            key={bookmark}
                                            onClick={() => handleBookmarkSelect(bookmark)}
                                            className={`block w-full py-2 px-4 text-left hover:bg-gray-100 text-xs ${selectedBookmark === bookmark ? 'bg-gray-100' : ''}`}
                                        >
                                            {bookmark}
                                        </button>))
                                }
                                {
                                    selectedBookmark && (
                                        <button
                                            onClick={handleDeleteBookmark}
                                            className="block w-full py-2 px-4 text-left text-red-500 hover:bg-gray-100 text-xs"
                                        >
                                            Clear
                                        </button>)
                                }
                            </div>
                        )}

                    </div>
                </div>
                <div className="mt-8 text-xs text-gray-500">
                    <p>Created At: {formatDate(created_at)}</p>
                    <p>Updated At: {formatDate(updated_at)}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
