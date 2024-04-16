// Import base API URL from constants file
import { base_api_url } from "./constants";

// Function to fetch user profile data
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

// Function to resend confirmation email
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

// Function to refresh authentication token
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

// Function to confirm email
const confirm_email = async (token, email, password) => {
    try {
        // Construct URL for confirming email with token, email, and password
        const url = new URL(base_api_url + "auth/confirm-email/" + token);
        url.searchParams.set("email", email);
        url.searchParams.set("password", password);
        // Send POST request to confirm email
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

// Function to login user
const login_user = async (email, password) => {
    try {
        // Construct URL for logging in with email and password
        const url = new URL(base_api_url + "auth/login");
        url.searchParams.set("email", email);
        url.searchParams.set("password", password);
        // Send POST request to login
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

// Function to register user
const register_user = async (user) => {
    // Convert user object to URLSearchParams
    const params = new URLSearchParams(user).toString();
    const url = new URL(base_api_url + "auth/register");

    try {
        // Send POST request to register user
        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const data = await response.json();
        const status = response.status;

        return { data: data, status: status };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

// Function to update user profile
const update_profile = async (auth_token, profile_data) => {
    try {
        // Send PUT request to update user profile
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

// Function to send forgot password email
const send_forgot_password_email = async (email) => {
    try {
        // Construct URL for sending forgot password email
        const url = new URL(base_api_url + "auth/forgot-password");
        url.searchParams.set("email", email);
        // Send POST request to send forgot password email
        const response = await fetch(url, {
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

// Function to change user password
const change_password = async (auth_token, old_password, new_password) => {
    try {
        // Construct URL for changing password
        const url = new URL(base_api_url + "auth/change-password");
        url.searchParams.set("old_password", old_password);
        url.searchParams.set("new_password", new_password);
        // Send PUT request to change password
        const response = await fetch(base_api_url + "auth/change-password", {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + auth_token,
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

// Function to change user password with token
const change_password_with_token = async (token, old_password, new_password) => {
    try {
        // Construct URL for changing password with token
        const url = new URL(base_api_url + "auth/change-password/" + token);
        url.searchParams.set("old_password", old_password);
        url.searchParams.set("new_password", new_password);
        // Send PUT request to change password with token
        const response = await fetch(url.toString(), {
            method: "PUT",
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

// Export all functions for use in other modules
export {
    resend_confirmation_email,
    refreshToken,
    confirm_email,
    login_user,
    register_user,
    change_password,
    change_password_with_token,
    update_profile,
    send_forgot_password_email,
    get_profile
}
