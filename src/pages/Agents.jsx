import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet';
import SearchBar from '../components/SearchBar';
import AuthorCard from "../components/AuthorCard"
import AuthorCardSkeleton from "../components/AuthorCardSkeleton"


function Agents() {
    const { base_api_url } = useContext(AuthContext)
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
        const fetchBooks = () => {
            setLoading(true);
            const params = new URLSearchParams(window.location.search);
            const query = params.get('query');
            const subject = params.get('subject');
            const bookshelf = params.get('bookshelf');
            const agent = params.get('agent');
            const page = params.get('page') || 1;
            const base_url = new URL(base_api_url);
            const api_url = new URL("agents", base_url);
            if (subject) {
                api_url.searchParams.set('subject', subject);
            }
            if (bookshelf) {
                api_url.searchParams.set('bookshelf', bookshelf);
            }
            if (agent) {
                api_url.searchParams.set('agent', agent);
            }
            if (query) {
                api_url.searchParams.set('q', query);
            }
            api_url.searchParams.set('page', page);
            fetch(api_url.toString())
                .then(response => response.json())
                .then(data => {
                    const crumbs = [
                        { name: 'Home', url: '/' },
                        { name: 'Agents', url: '/agents' },
                    ]
                    if (subject) {
                        crumbs.push({ name: "subject: " + subject, url: `/books?subject=${subject}` });
                    }
                    if (bookshelf) {
                        crumbs.push({ name: "bookshelf: " + bookshelf, url: `/books?bookshelf=${bookshelf}` });
                    }
                    if (agent) {
                        crumbs.push({ name: "agent: " + agent, url: `/books?agent=${agent}` });
                    }
                    if (query) {
                        crumbs.push({ name: "query: " + query, url: '' });
                    }
                    setBreadcrumbs(crumbs)
                    setPagination(data);
                }).catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        fetchBooks();
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
