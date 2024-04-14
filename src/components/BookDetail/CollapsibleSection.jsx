import React, { useState } from "react";

const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4">
            <button
                className="flex items-center justify-between w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold">{title}</h3>
                <svg
                    className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a1 1 0 0 1-.707-1.707l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 16.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3.999 4A1 1 0 0 1 10 18z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
            {isOpen && (
                <div className="p-4 bg-white shadow-md rounded-md">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSection;