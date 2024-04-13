const base_api_url = "http://localhost:8081/api/v1/";
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
const get_profile = async (auth_token) => {
    try {
        const response = await fetch(base_api_url + "user/profile", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + auth_token
            }
        });

        const data = await response.json();
        const status = response.status;

        return { profile: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};

const resend_confirmation_email = async (auth_token) => {
    try {
        const response = await fetch(base_api_url + "auth/confirm-email", {
            method: "POST",
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
const refreshToken = async (refresh_token) => {
    try {
        const response = await fetch(base_api_url + "auth/refresh", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + refresh_token
            }
        });

        const data = await response.json();
        const status = response.status;

        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
const confirm_email = async (token, email, password) => {
    try {
        const url = new URL(base_api_url + "auth/confirm-email/" + token);
        url.searchParams.set("email", email);
        url.searchParams.set("password", password);
        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: url.searchParams.toString()
        });

        const data = await response.json();
        const status = response.status;

        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
const login_user = async (email, password) => {
    try {
        const url = new URL(base_api_url + "auth/login");
        url.searchParams.set("email", email);
        url.searchParams.set("password", password);
        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: url.searchParams.toString()
        });

        const data = await response.json();
        const status = response.status;

        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const update_profile = async (auth_token, profile_data) => {
    try {
        const response = await fetch(base_api_url + "user/profile", {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile_data)
        });

        const data = await response.json();
        const status = response.status;

        return { data: data.item, status: status };
    } catch (error) {
        console.log(error);
        return { error: error.message, status: 500 };
    }
}

const send_forgot_password_email = async (auth_token, email) => {
    try {
        const response = await fetch(base_api_url + "auth/forgot-password", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "email": email })
        });

        const data = await response.json();
        const status = response.status;

        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
const change_password = async (old_password, new_password, token) => {
    try {
        const response = await fetch(base_api_url + "auth/change-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({ "old_password": old_password, "new_password": new_password, "token": token })
        });

        const data = await response.json();
        const status = response.status;

        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
export {
    get_items, get_item,
    get_profile,
    resend_confirmation_email,
    refreshToken,
    confirm_email,
    login_user,
    update_profile,
    send_forgot_password_email,
    change_password
};