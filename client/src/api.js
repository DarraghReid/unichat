import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export default api;
// This file sets up an Axios instance with a base URL for the API.
// It allows you to make HTTP requests to the backend API easily.
// The base URL can be configured using an environment variable REACT_APP_API_URL, defaulting to "http://localhost:5000" if not set.