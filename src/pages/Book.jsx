import React, { useEffect } from 'react'
import { useState } from 'react'
import { get_item_by_id } from '../utils/api'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import BookDetail from '../components/BookDetail'
import BookDetailSkeleton from '../components/BookDetail/BookDetailSkeleton'
import Comments from '../components/comments'
import Reviews from '../components/reviews'

function Book() {
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(false)
    const [openedTab, setOpenedTab] = useState("review")
    const { id } = useParams()


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await get_item_by_id("books", id)
                if (response.status === 200)
                    setBook(response.item.item)
                else {
                    setBook(null)
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
        loading || !book ? <div>
            <BookDetailSkeleton />
        </div> :
            <>
                <Helmet>
                    <title>
                        {book.title} | Pico-Library
                    </title>
                </Helmet>
                <div>
                    <BookDetail book={book} />
                    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" >
                            <li className="me-2" role="presentation">
                                <button onClick={() => setOpenedTab("review")} disabled={openedTab === "review"} className={`inline-block p-4  rounded-t-lg  ${openedTab === "review" ? "border-b-2 cursor-default" : "cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`} type="button" role="tab" aria-selected="true">Reviews</button>
                            </li>
                            <li className="me-2" role="presentation">
                                <button onClick={() => setOpenedTab("comment")} disabled={openedTab === "comment"} className={`inline-block p-4 rounded-t-lg ${openedTab === "comment" ? "border-b-2 cursor-default" : "cursor-pointer hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`} >Comments</button>
                            </li>
                        </ul>
                    </div>
                    <div id="default-tab-content">
                        <div className={`${openedTab === "review" ? "" : "hidden"} `} >
                            <Reviews id={id} />
                        </div>
                        <div className={`${openedTab === "comment" ? "" : "hidden"}  overflow-x-scroll`} >
                            <Comments id={id} type={"comment"} />
                        </div>

                    </div>

                </div>

            </>

    )
}

export default Book
