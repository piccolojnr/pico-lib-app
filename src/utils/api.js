import { base_api_url } from "./constants";
const endpoints_match = {
    "agent": "agents",
    "subject": "subjects",
    "bookshelf": "bookshelves",
}

const get_items = async (endpoint) => {
    try {
        const params = new URLSearchParams(window.location.search);
        const base_url = new URL(base_api_url);
        const api_url = new URL(endpoint, base_url);
        api_url.search = params;

        const response = await fetch(api_url.toString())

        const data = await response.json();
        const status = response.status;

        return { "pagination": data, error: data?.message, params: params, "status": status }
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

const get_item = async (param) => {
    try {
        if (!param) {
            return { result: { "error": "No param provided", "status": "error" } };
        }
        if (!endpoints_match[param[0]]) {
            return { result: { "error": "No endpoint match", "status": "error" } };
        }
        const endpoint = endpoints_match[param[0]] + "/" + param[1];
        const response = await fetch(base_api_url + endpoint)

        const data = await response.json();
        const status = response.status;

        return { item: data, status: status };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}
const get_item_by_id = async (endpoint, id) => {
    try {
        const response = await fetch(base_api_url + endpoint + "/" + id)

        const data = await response.json();
        const status = response.status;

        return { item: data.item, status: status };
    }
    catch (error) {
        return { error: error.message, status: 500 };
    }
}

const get_user_bookmark_books = async (authToken, book_id) => {
    try {
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

const create_bookmark = async (authToken, book_id, bookmark) => {
    try {
        const url = new URL(base_api_url + "bookmarks/" + book_id);
        url.searchParams.append("status", bookmark);
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
const delete_bookmark = async (authToken, book_id) => {
    try {
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

const get_bookmarked_books = async (authToken, status) => {
    try {
        const url = new URL(base_api_url + "bookmarks/books");
        if (status)
            url.searchParams.append("status", status);
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

export {
    get_items,
    get_item,
    get_item_by_id, get_user_bookmark_books,
    create_bookmark, delete_bookmark, get_bookmarked_books
};