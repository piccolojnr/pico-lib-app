import React, { useContext, useEffect, useState } from 'react'
import Jumbotron from '../components/Jumbotron'
import BookCard from '../components/BookCard'
import AuthorCard from '../components/AuthorCard'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
function Home() {
    const { base_api_url } = useContext(AuthContext)
    const [popularBooks, setPopularBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const [subjects, setSubjects] = useState([])
    const [bookshelves, setBookshelves] = useState([])

    useEffect(() => {
        fetch(`${base_api_url}books/popular?per_page=4`).then(res => res.json()).then(data => {
            setPopularBooks(data.items)
        }).catch(err => console.log(err))

        fetch(`${base_api_url}agents/popular?per_page=4`).then(res => res.json()).then(data => {
            setAuthors(data.items)
        }).catch(err => console.log(err))

        fetch(`${base_api_url}bookshelves?per_page=10`).then(res => res.json()).then(data => {
            setBookshelves(data.items)
        }).catch(err => console.log(err))

        fetch(`${base_api_url}subjects?per_page=10`).then(res => res.json()).then(data => {
            setSubjects(data.items)
        }).catch(err => console.log(err))
    }, [base_api_url])

    return (
        <div className=''>
            <Jumbotron />
            {/* popular books */}
            <div className='mt-8 p-4'>
                <h1 className='font-bold text-3xl text-slate-600 mb-8'>Popular Books</h1>
                <div className='flex items-center justify-center flex-wrap gap-4'>
                    {popularBooks.map(book =>
                        <BookCard key={book.id} book={book} />)}
                </div>
            </div>
            {/* renown authors */}
            <div className='mt-8 p-4'>
                <h1 className='font-bold text-3xl text-slate-600 mb-8'>Meet Renowned Authors</h1>
                <div className='flex items-center justify-center flex-wrap gap-4'>
                    {
                        authors.map(author =>
                            <AuthorCard key={author.id} author={author} />)
                    }
                </div>
            </div>

            {/* bookshelves */}
            <div className='mt-8 p-4'>
                <h1 className='font-bold text-3xl text-slate-600 mb-8'>Discover Unique Bookshelves</h1>
                <div className='flex items-center justify-center flex-wrap gap-4'>
                    {bookshelves.map(bookshelf => (
                        <Link key={bookshelf.id} to={`/bookshelves/${bookshelf.id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 tracking-tight text-gray-900 dark:text-white">{bookshelf.name}</h5>
                        </Link>

                    ))}
                </div>
            </div>
            {/* subjects */}
            <div className='mt-8 p-4'>
                <h1 className='font-bold text-3xl text-slate-600 mb-8'>Explore Subjects</h1>
                <div className='flex items-center justify-center flex-wrap gap-4'>
                    {subjects.map(subject => (
                        <Link key={subject.id} to={`/subjects/${subject.id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 tracking-tight text-gray-900 dark:text-white">{subject.name}</h5>
                        </Link>

                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home
