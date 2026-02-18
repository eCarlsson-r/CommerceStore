import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true, 
});

api.interceptors.request.use((config) => {
    // Check if we are in the browser before using js-cookie
    if (typeof window !== "undefined") {
        const token = Cookies.get("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isServer = typeof window === "undefined";
        const message = error.response?.data?.message || error.message || "An error occurred";

        if (error.response?.status === 401) {
            if (!isServer) {
                Cookies.remove("auth_token");
                window.location.href = "/login";
            }
        } else {
            // Only show toasts if we are in the browser
            if (!isServer) {
                toast.error(message);
            } else {
                console.error("Server-side API Error:", message);
            }
        }
        return Promise.reject(error);
    }
);

export default api;