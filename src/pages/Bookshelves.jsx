import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet';
import SearchBar from '../components/SearchBar';
import { get_items } from '../api/api';

function Bookshelves() {
    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: 'Home', url: '/' },
        { name: 'Bookshelves', url: '/bookshelves' },
    ])
    const [pagination, setPagination] = useState({
        items: [],
        total_pages: 0,
        page: 0,
        has_prev: false,
        has_next: false,
    })
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.location.href = `?${params.toString()}`;
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.query.value;
        const params = new URLSearchParams(window.location.search);
        params.set('query', query);
        params.set('page', 1)
        window.location.href = `?${params.toString()}`;
    }


    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                setLoading(true);
                const response = await get_items("bookshelves")
                if (response.status !== 200) {
                    throw new Error(response.error);
                }
                setBreadcrumbs([
                    { name: 'Home', url: '/' },
                    { name: 'Bookshelves', url: '/bookshelves' },
                ])
                response.params.entries().forEach(async (v) => {
                    if (v && v[0] !== "page") {
                        let name = v[1]
                        setBreadcrumbs(prevBreadcrumbs => [
                            ...prevBreadcrumbs,
                            {
                                name: v[0] + ": " + name,
                                url: `/books?${v[0]}=${v[1]}`
                            }
                        ])
                    }
                })
                setPagination(response.pagination)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBookshelves();
        // eslint-disable-next-line
    }, [navigate])

    return (
        <>
            <Helmet>
                <title>Bookshelves | pico-library</title>
            </Helmet>
            <div className="p-5 bg-gray-200">
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                <SearchBar placeholder="Search Bookshelves" handleSearch={handleSearch} />

                <div className='flex items-center flex-col justify-center mt-8'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 min-[1080px]:grid-cols-4  gap-4 w-fit">
                        {
                            loading ?
                                Array.from({ length: 10 }).map((_, index) => (
                                    <div className="w-64 h-52" key={index}>
                                        <div className="animate-pulse shadow-md dark:bg-gray-600 rounded-lg h-full">
                                            <div className="p-4 h-full flex flex-col items-start justify-between">
                                                <div className="bg-gray-400 h-8 w-3/4 rounded mb-2"></div>
                                                <div className="bg-gray-400 h-8 w-1/2 rounded"></div>
                                                <div className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-600"></div>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                pagination.items.map((bookshelf, index) => (
                                    <div className="w-64 h-52" key={bookshelf.id}>
                                        <div className="shadow-md dark:bg-gray-600 rounded-lg h-full" >
                                            <div className="p-4 h-full flex flex-col items-start justify-between ">
                                                <h5 className="text-xl dark:text-gray-50 font-bold mb-2 line-clamp-4">{bookshelf.name}</h5>
                                                <Link to={`/books?bookshelf=${bookshelf.id}`} className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-600">
                                                    View Books
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>

                <div className='mt-8 flex items-center justify-center'>
                    {
                        loading ?
                            <Pagination page={0} total_items={0} has_next={false} has_prev={false} />
                            :
                            <Pagination page={pagination.page} total_items={pagination.total_items} has_next={pagination.has_next} has_prev={pagination.has_prev} handlePageChange={handlePageChange} />
                    }
                </div>
            </div>
        </>
    )
}

export default Bookshelves
