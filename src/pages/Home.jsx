import React, { useContext, useEffect, useState } from 'react'
import Jumbotron from '../components/Jumbotron'
import BookCard from '../components/BookCard'
import AuthorCard from '../components/AuthorCard'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import BookCardSkeleton from '../components/BookCardSkeleton'
import AuthorCardSkeleton from '../components/AuthorCardSkeleton'
import About from '../components/About'

function Home() {
    const { base_api_url } = useContext(AuthContext);
    const [recentBooks, setRecentBooks] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [bookshelves, setBookshelves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const api_url = new URL(base_api_url);
                const fetchItems = async (endpoint, params = { per_page: 10 }) => {
                    const url = new URL(endpoint, api_url);
                    for (const [key, value] of Object.entries(params)) {
                        url.searchParams.append(key, value);
                    }
                    const response = await fetch(url.toString());
                    const data = await response.json();
                    return data.items || [];
                };

                const [recent, popular, authors, shelves, subjects] = await Promise.all([
                    fetchItems('books/', { per_page: 4, sort: 'created_at', order: 'desc' }),
                    fetchItems('books/', { per_page: 4, sort: 'popularity', order: 'desc' }),
                    fetchItems('agents/popular', { per_page: 4 }),
                    fetchItems('bookshelves/', { per_page: 10 }),
                    fetchItems('subjects/', { per_page: 10 }),
                ]);

                setRecentBooks(recent);
                setPopularBooks(popular);
                setAuthors(authors);
                setBookshelves(shelves);
                setSubjects(subjects);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [base_api_url]);

    function random_choice(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }

    return (
        <div className=''>
            <Jumbotron />
            <About />
            {/* recent books */}
            <div className='mt-8 p-4 bg-gray-300'>
                <div className='mt-8 p-4 '>
                    <div className='flex items-center flex-col justify-center'>
                        <h1 className='font-bold text-3xl text-slate-600 mb-8'>Recent Books</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 min-[1080px]:grid-cols-4  gap-4 w-fit">
                            {loading || recentBooks.length === 0 ?

                                Array
                                    .from({ length: 4 })
                                    .map((_, index) => <BookCardSkeleton key={index} />)
                                :
                                recentBooks.map(book =>
                                    <BookCard key={book.id} book={book} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* popular books */}
            <div className='mt-8 p-4 bg-gray-300'>
                <div className='mt-8 p-4 '>
                    <div className='flex items-center flex-col justify-center'>
                        <h1 className='font-bold text-3xl text-slate-600 mb-8'>Popular Books</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 min-[1080px]:grid-cols-4  gap-4 w-fit">
                            {loading || popularBooks.length === 0 ?

                                Array
                                    .from({ length: 4 })
                                    .map((_, index) => <BookCardSkeleton key={index} />)
                                :
                                popularBooks.map(book =>
                                    <BookCard key={book.id} book={book} />)
                            }
                        </div>
                    </div>
                </div>
                {/* renown authors */}
                <div className='mt-8 p-4'>
                    <div className='flex items-center flex-col justify-center'>
                        <h1 className='font-bold text-3xl text-slate-600 mb-8'>Meet Renowned Authors</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 min-[1080px]:grid-cols-4  gap-4 w-fit">
                            {
                                loading || authors.length === 0 ?
                                    Array.from({ length: 4 })
                                        .map((_, index) => <AuthorCardSkeleton key={index} />)
                                    :
                                    authors.map(author =>
                                        <AuthorCard key={author.id} author={author} />)
                            }
                        </div>
                    </div>
                </div>

                {/* bookshelves */}
                <div className='mt-8 p-4'>
                    <div className='flex items-center flex-col justify-center'>
                        <h1 className='font-bold text-3xl text-slate-600 mb-8'>Discover Unique Bookshelves</h1>
                        <div className='flex items-center justify-center flex-wrap gap-4'>
                            {
                                loading || bookshelves.length === 0 ?
                                    Array.from({ length: 10 })
                                        .map((_, index) => (
                                            <div key={index} className={`w-${random_choice([28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 96])} h-16 overflow-hidden flex flex-col items-start justify-center gap-2 p-4  border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 animate-pulse`}>

                                            </div>
                                        ))
                                    :
                                    bookshelves.map(bookshelf => (
                                        <Link key={bookshelf.id} to={`/books?bookshelf=${bookshelf.id}`} className="block max-w-sm p-6  border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                            <h5 className="mb-2 tracking-tight text-gray-900 dark:text-white">{bookshelf.name}</h5>
                                        </Link>

                                    ))}
                        </div>
                    </div>
                </div>
                {/* subjects */}
                <div className='mt-8 p-4'>
                    <div className='flex items-center flex-col justify-center'>
                        <h1 className='font-bold text-3xl text-slate-600 mb-8'>Explore Subjects</h1>
                        <div className='flex items-center justify-center flex-wrap gap-4'>
                            {
                                loading || subjects.length === 0 ?
                                    Array.from({ length: 10 })
                                        .map((_, index) => (
                                            <div key={index} className={`w-${random_choice([28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 96])} h-16 overflow-hidden flex flex-col items-start justify-center gap-2 p-4  border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 animate-pulse`}>
                                            </div>
                                        ))
                                    :
                                    subjects.map(subject => (
                                        <Link key={subject.id} to={`/books?subject=${subject.id}`} className="block max-w-sm p-6  border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                            <h5 className="mb-2 tracking-tight text-gray-900 dark:text-white">{subject.name}</h5>
                                        </Link>

                                    ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
