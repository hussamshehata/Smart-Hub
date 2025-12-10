import axios from "axios";

// Create Axios instance
const api = axios.create({
    baseURL: "https://smart-hub-server.vercel.app", // your backend URL
    withCredentials: false, // no cookies needed
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token automatically to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // attach token
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
