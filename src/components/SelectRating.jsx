import React, { useState } from 'react';

function SelectRating({ setRating, rating: r }) {
    const [rating, setLocalRating] = useState(r); // Default rating of 1

    const handleRating = (e) => {
        const selectedRating = parseInt(e.target.value);
        setLocalRating(selectedRating);
        setRating(selectedRating);
        console.log(selectedRating);
    };

    return (
        <div className="flex flex-row-reverse justify-end items-center my-4">
            {[...Array(5)].map((_, index) => (
                <React.Fragment key={index}>
                    <input
                        onChange={handleRating}
                        key={index}
                        id={`hs-ratings-readonly-${5 - index}`}
                        type="radio"
                        className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                        name="hs-ratings-readonly"
                        value={5 - index}
                        checked={rating === 5 - index} // Set checked state based on the current rating
                    />
                    <label
                        htmlFor={`hs-ratings-readonly-${5 - index}`}
                        className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600"
                    >
                        <svg
                            className="flex-shrink-0 size-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                    </label>
                </React.Fragment>
            ))}
        </div>
    );
}

export default SelectRating;
