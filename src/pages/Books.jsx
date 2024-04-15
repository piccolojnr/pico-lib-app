import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import BookCardSkeleton from '../components/BookCardSkeleton';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet';
import SearchBar from '../components/SearchBar';
import { get_items, get_item } from '../utils/api';


const sort_orders = [
    {
        label: "Date Added - asc",
        value: "created_at",
        order: "asc"
    },
    {
        label: "Date Added - desc",
        value: "created_at",
        order: "desc"
    },
    {
        label: "Date Updated - asc",
        value: "updated_at",
        order: "asc"
    },
    {
        label: "Date Updated - desc",
        value: "updated_at",
        order: "desc",
    },
    {
        label: "Popularity - asc",
        value: "popularity",
        order: "asc"
    },
    {
        label: "Popularity - desc",
        value: "popularity",
        order: "desc"
    },
    {
        label: "Title - asc",
        value: "title",
        order: "asc"
    },
    {
        label: "Title - desc",
        value: "title",
        order: "desc"
    },
]


function Books() {
    const [sort, setSort] = useState("")
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


    const handleSortChange = (e) => {
        const sort_index = e.target.value;
        if (sort_index === "") {
            const params = new URLSearchParams(window.location.search);
            params.delete('sort');
            params.delete('order');
            params.set('page', 1)
            window.location.href = `?${params.toString()}`;
            return;
        }
        const sort = sort_orders[sort_index];
        const params = new URLSearchParams(window.location.search);
        params.set('sort', sort.value);
        params.set('order', sort.order);
        params.set('page', 1)
        window.location.href = `?${params.toString()}`;
    }

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
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await get_items("books/");
                if (response.status !== 200) {
                    throw new Error(response.error);
                }

                const newBreadcrumbs = [
                    { name: 'Home', url: '/' },
                    { name: 'Books', url: '/books' },
                ];

                for (const [key, value] of response.params) {
                    if (key === "sort") {
                        setSort(sort_orders.findIndex(x => x.value === value));
                    } else if (key !== "page" && key !== "order") {
                        const name = key + ": " + value;
                        newBreadcrumbs.push({ name, url: `/books?${key}=${value}` });

                        if (parseInt(value)) {
                            const itemResponse = await get_item([key, value]);
                            if (itemResponse.status === 200) {
                                newBreadcrumbs[newBreadcrumbs.length - 1].name = `${key}: ${itemResponse.item.name}`;
                            }
                        }
                    }
                }

                setBreadcrumbs(newBreadcrumbs);
                setPagination(response.pagination);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Books | pico-library</title>
            </Helmet>
            <div className="p-5 bg-gray-200">
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                <SearchBar handleSearch={handleSearch} placeholder="Search Books" />
                <div className='flex items-center justify-center mt-8'>
                    <label className='mr-2'
                        htmlFor="sort"  >
                        <i className='fa-solid fa-filter'></i>
                    </label>
                    <select name='sort' className='p-2 border border-gray-300 rounded-md text-sm' value={sort} onChange={handleSortChange}>
                        <option value="">none</option>
                        {sort_orders.map((sort, index) => (
                            <option key={sort.label} value={index} className='lowercase'>
                                {sort.label}</option>
                        ))}
                    </select>
                </div>

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
            </div >

        </>
    )
}

export default Books
