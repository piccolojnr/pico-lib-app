import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet';
import SearchBar from '../components/SearchBar';
import AuthorCard from "../components/AuthorCard"
import AuthorCardSkeleton from "../components/AuthorCardSkeleton"
import {  get_items } from '../utils/api';


function Agents() {
    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: 'Home', url: '/' },
        { name: 'Agents', url: '/agents' },
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
        const fetchAgents = async () => {
            try {
                setLoading(true);
                const response = await get_items("agents/")
                if (response.status !== 200) {
                    throw new Error(response.error);
                }
                const newBreadcrumbs = [
                    { name: 'Home', url: '/' },
                    { name: 'Agents', url: '/agents' },
                ];

                for (const [key, value] of response.params) {
                    if (key !== "page" && key !== "order") {
                        const name = key + ": " + value;
                        newBreadcrumbs.push({ name, url: `/agents?${key}=${value}` });
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
        fetchAgents();
        // eslint-disable-next-line
    }, [navigate])

    return (
        <>
            <Helmet>
                <title>Agents | pico-library</title>
            </Helmet>
            <div className="p-5 bg-gray-200">
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                <SearchBar handleSearch={handleSearch} placeholder="Search Agents" />

                <div className='flex items-center flex-col justify-center mt-8'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 min-[1080px]:grid-cols-4  gap-4 w-fit">
                        {
                            loading ?
                                Array.from({ length: 10 }).map((_, index) => (
                                    <AuthorCardSkeleton key={index} />
                                )) :
                                pagination.items.map((author, index) => (
                                    <AuthorCard author={author} key={index} />
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

export default Agents
