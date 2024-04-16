// This file exports the base API URL used for making requests to the server.
// It checks if the REACT_APP_BASE_API_URL environment variable is set. 
// If set, it uses the value of REACT_APP_BASE_API_URL as the base URL.
// If not set, it defaults to "http://localhost:8081/api/v1/" for local development.

// Importing process.env.REACT_APP_BASE_API_URL to access the base API URL from environment variables.
const base_api_url = process.env.REACT_APP_BASE_API_URL || "http://localhost:8081/api/v1/";

// Exporting the base API URL for use in other files.
export { base_api_url };
