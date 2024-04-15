import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet';
import SearchBar from '../components/SearchBar';
import { get_items } from '../utils/api';

function Subjects() {
    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: 'Home', url: '/' },
        { name: 'Subjects', url: '/subjects' },
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
        const fetchSubjects = async () => {
            try {
                setLoading(true);
                const response = await get_items("subjects/")
                if (response.status !== 200) {
                    throw new Error(response.error);
                }
                const newBreadcrumbs = [
                    { name: 'Home', url: '/' },
                    { name: 'Subjects', url: '/subjects' },
                ];

                for (const [key, value] of response.params) {
                    if (key !== "page" && key !== "order") {
                        const name = key + ": " + value;
                        newBreadcrumbs.push({ name, url: `/subjects?${key}=${value}` });
                    }
                }

                setBreadcrumbs(newBreadcrumbs)
                setPagination(response.pagination)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSubjects();
        // eslint-disable-next-line
    }, [navigate])

    return (
        <>
            <Helmet>
                <title>Subjects | pico-library</title>
            </Helmet>
            <div className="p-5 bg-gray-200">
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                <SearchBar placeholder="Search Subjects" handleSearch={handleSearch} />

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
                                pagination.items.map((subject, index) => (
                                    <div className="w-64 h-52" key={subject.id}>
                                        <div className="shadow-md dark:bg-gray-600 rounded-lg h-full" >
                                            <div className="p-4 h-full flex flex-col items-start justify-between ">
                                                <h5 className="text-xl dark:text-gray-50 font-bold mb-2 line-clamp-4">{subject.name}</h5>
                                                <Link to={`/books?subject=${subject.id}`} className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-600">
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

export default Subjects
