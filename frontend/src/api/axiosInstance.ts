import axios from "axios";

// Use environment variable, fallback to localhost
const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL: apiBase,
    withCredentials: true // only if you're using cookies/session auth
});

export default axiosInstance;
