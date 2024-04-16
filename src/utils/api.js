// Import base API URL from constants file
import { base_api_url } from "./constants";

// Define mapping of endpoints to their plural forms
const endpoints_match = {
    "agent": "agents",
    "subject": "subjects",
    "bookshelf": "bookshelves",
}

// Function to fetch items from an endpoint with pagination
const get_items = async (endpoint) => {
    try {
        // Get URL parameters from the current window location
        const params = new URLSearchParams(window.location.search);
        const base_url = new URL(base_api_url);
        // Construct API URL using base URL and provided endpoint
        const api_url = new URL(endpoint, base_url,);
        api_url.search = params;
        // Fetch data from the API
        const response = await fetch(api_url.toString())
        const data = await response.json();
        const status = response.status;

        return { "pagination": data, error: data?.message, params: params, "status": status }
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

// Function to fetch a single item from an endpoint
const get_item = async (param) => {
    try {
        if (!param) {
            return { result: { "error": "No param provided", "status": "error" } };
        }
        if (!endpoints_match[param[0]]) {
            return { result: { "error": "No endpoint match", "status": "error" } };
        }
        // Construct endpoint URL based on the provided parameter
        const endpoint = endpoints_match[param[0]] + "/" + param[1];
        // Fetch data from the API
        const response = await fetch(base_api_url + endpoint)

        const data = await response.json();
        const status = response.status;

        return { item: data, status: status };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

// Function to fetch a single item by ID from a specific endpoint
const get_item_by_id = async (endpoint, id) => {
    try {
        // Fetch data from the API using the provided endpoint and ID
        const response = await fetch(base_api_url + endpoint + "/" + id)
        const data = await response.json();
        const status = response.status;
        return { item: data, status: status };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

// Function to fetch bookmarked books for a user
const get_user_bookmark_books = async (authToken, book_id) => {
    try {
        // Fetch bookmarked books for a user from the API
        const response = await fetch(base_api_url + "bookmarks/" + book_id, {
            headers: {
                "Authorization": "Bearer " + authToken
            }
        })

        const data = await response.json();
        const status = response.status;

        return { bookmark: data, status: status };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

// Function to create a bookmark for a user
const create_bookmark = async (authToken, book_id, bookmark) => {
    try {
        // Construct URL for creating a bookmark
        const url = new URL(base_api_url + "bookmarks/" + book_id);
        url.searchParams.append("status", bookmark);
        // Send POST request to create the bookmark
        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + authToken
            },

        })

        const data = await response.json();
        const status = response.status;

        return { bookmark: data, status: status };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

// Function to delete a bookmark for a user
const delete_bookmark = async (authToken, book_id) => {
    try {
        // Send DELETE request to remove the bookmark
        const response = await fetch(base_api_url + "bookmarks/" + book_id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + authToken
            }
        })

        const data = await response.json();
        const status = response.status;

        return { bookmark: data, status: status };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

// Function to fetch bookmarked books for a user
const get_bookmarked_books = async (authToken, status) => {
    try {
        // Construct URL for fetching bookmarked books
        const url = new URL(base_api_url + "bookmarks/books");
        if (status)
            url.searchParams.append("status", status);
        // Fetch bookmarked books for a user from the API
        const response = await fetch(url.toString(), {
            headers: {
                "Authorization": "Bearer " + authToken
            }
        })

        const data = await response.json();
        const status_ = response.status;

        return { pagination: data, status: status_ };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

// Export all functions for use in other modules
export {
    get_items,
    get_item,
    get_item_by_id,
    get_user_bookmark_books,
    create_bookmark,
    delete_bookmark,
    get_bookmarked_books
};
