import React, { useEffect } from 'react'
import { get_item_by_id } from '../utils/api'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

function Agent() {
    const { id } = useParams()
    const [agent, setAgent] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await get_item_by_id("agents", id)
                if (response.status === 200)
                    setAgent(response.item)
                else {
                    setAgent(null)
                    console.log(response)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])
    return (
        loading || !agent ?
            <div className="container mx-auto mt-8">

                <div className="animate-pulse">
                    <div className="text-3xl font-bold bg-gray-200 h-10 w-72 rounded-lg mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-200 h-8 w-36 rounded-lg"></div>
                        <div className="bg-gray-200 h-8 w-36 rounded-lg"></div>
                    </div>
                    <div className="bg-gray-200 h-8 w-60 rounded-lg mb-4"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <div className="bg-gray-200 h-40 w-full rounded-md mb-2"></div>
                                <div className="bg-gray-200 h-4 w-4/5 rounded-md mb-2"></div>
                                <div className="bg-gray-200 h-4 w-3/5 rounded-md mb-2"></div>
                                <div className="bg-gray-200 h-4 w-4/6 rounded-md mb-2"></div>
                                <div className="bg-gray-200 h-4 w-3/6 rounded-md mb-2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            :
            <div className="container mx-auto mt-8">
                <Helmet>
                    <title>
                        {agent.name} | Pico-Library
                    </title>
                </Helmet>
                <h1 className="text-3xl font-bold">{agent.name}</h1>
                <p className="mt-2">Birth Date: {agent.birth_date}</p>
                <p>Death Date: {agent.death_date}</p>
                <p>Webpage: <a href={agent.webpage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{agent.webpage}</a></p>
                <p>Agent Type: {agent.agent_type}</p>

                <h2 className="text-2xl font-bold mt-4">Agent Books</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {agent.agent_books.map(book => (
                        <li key={book.id} className="bg-white rounded-lg shadow-md p-4">
                            <img src={book.image} alt={book.title} className="w-full h-40 object-cover rounded-md mb-2" />
                            <p className="text-lg font-semibold">{book.title}</p>
                            <p className="text-sm">{book.format}</p>
                            <p className="text-sm">{book.description}</p>
                            <p className="text-sm">License: <a href={book.license} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{book.license}</a></p>
                            <p className="text-sm">Downloads: {book.downloads}</p>
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default Agent
