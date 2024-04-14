import { base_api_url } from "./constants";
const get_comments_by_book_id = async (book_id, type, page = 1) => {
    try {
        const url = new URL(base_api_url + "comments/");
        url.searchParams.set("book_id", book_id);
        url.searchParams.set("type", type);
        url.searchParams.set("page", page);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "accept": "application/json"
            }
        });

        const data = await response.json();
        const status = response.status;

        return { pagination: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
const get_comments_by_user_id = async (user_id, type, page = 1) => {
    try {
        const url = new URL(base_api_url + "comments/");
        url.searchParams.set("user_id", user_id);
        url.searchParams.set("type", type);
        url.searchParams.set("page", page);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "accept": "application/json"
            }
        });

        const data = await response.json();
        const status = response.status;

        return { pagination: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
const get_comments_by_parent_id = async (parent_id, type, page = 1) => {
    try {
        const url = new URL(base_api_url + "comments/");
        url.searchParams.set("parent_id", parent_id);
        url.searchParams.set("type", type);
        url.searchParams.set("page", page);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "accept": "application/json"
            }
        });

        const data = await response.json();
        const status = response.status;

        return { pagination: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
const get_comments = async (type, { book_id, parent_id, user_id }, page = 1) => {
    if (book_id) {
        return await get_comments_by_book_id(book_id, type, page);
    }
    if (parent_id) {
        return await get_comments_by_parent_id(parent_id, type, page);
    }
    if (user_id) {
        return await get_comments_by_user_id(user_id, type, page);
    }
    return { error: "No id provided", status: 500 };
}
const get_comment = async (comment_id) => {
    try {
        const response = await fetch(base_api_url + "comments/" + comment_id, {
            method: "GET",
            headers: {
                "accept": "application/json"
            }
        });

        const data = await response.json();
        const status = response.status;

        return { comment: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
const create_comment = async (auth_token, content, type, rating, { book_id, parent_id }) => {
    try {
        const body = {
            content: content,
            type: type,
            parent_id: parent_id ? parseInt(parent_id) : 0,
            rating: rating ? rating : 0,
            book_id: book_id ? parseInt(book_id) : 0
        }
        const response = await fetch(base_api_url + "comments/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        const status = response.status;
        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const delete_comment = async (auth_token, comment_id) => {
    try {
        const response = await fetch(base_api_url + "comments/" + comment_id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + auth_token
            }
        });

        const data = await response.json();
        const status = response.status;

        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const vote_comment = async (auth_token, comment_id, vote) => {
    try {
        const response = await fetch(base_api_url + "comments/" + comment_id + "/vote", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ vote_type: vote })
        });

        const data = await response.json();
        const status = response.status;

        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
export {
    get_comments,
    get_comment,
    create_comment,
    delete_comment,
    vote_comment,


};