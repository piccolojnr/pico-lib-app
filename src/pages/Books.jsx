import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import BookCardSkeleton from '../components/BookCardSkeleton';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet';
import SearchBar from '../components/SearchBar';
import { get_items, get_item } from '../api/api';

function Books() {
    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: 'Home', url: '/' },
        { name: 'Books', url: '/books' },
    ])
    const [pagination, setPagination] = useState({
        items: [],
        total_pages: 0,
        total_items: 0,
        items_per_page: 10,
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
        const get_item_name = async (param) => {
            const response = await get_item(param)
            if (response.status === 200) {
                const name = response.item.name
                setBreadcrumbs(prevBreadcrumbs => {
                    const newBreadcrumbs = [...prevBreadcrumbs]
                    const index = newBreadcrumbs.findIndex(breadcrumb => breadcrumb.url === `/books?${param[0]}=${param[1]}`)
                    if (index === -1) {
                        return prevBreadcrumbs
                    }
                    newBreadcrumbs[index].name = param[0] + ": " + name
                    return newBreadcrumbs
                })
            }
        }
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await get_items("books")
                if (response.status !== 200) {
                    throw new Error(response.error);
                }
                setBreadcrumbs([
                    { name: 'Home', url: '/' },
                    { name: 'Books', url: '/books' },
                ])
                response.params.entries().forEach(async (v) => {
                    if (v && v[0] !== "page") {
                        let name = v[1]
                        if (v[0] !== "query" && parseInt(v[1])) {
                            get_item_name(v)
                        }
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
            }finally {
                setLoading(false);
            }
        }
        fetchBooks();
        // eslint-disable-next-line
    }, [navigate])

    return (
        <>
            <Helmet>
                <title>Books | pico-library</title>
            </Helmet>
            <div className="p-5 bg-gray-200">
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                <SearchBar handleSearch={handleSearch} placeholder="Search Books" />

                <div className='flex items-center flex-col justify-center mt-8'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 min-[1080px]:grid-cols-4  gap-4 w-fit">
                        {
                            loading ?
                                Array.from({ length: 10 }).map((_, index) => (
                                    <BookCardSkeleton key={index} />
                                )) :
                                pagination.items.map((book, index) => (
                                    <BookCard book={book} key={index} />
                                ))}
                    </div>
                </div>

                <div className='mt-8 flex items-center justify-center '>
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

export default Books
