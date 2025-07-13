import axios from "axios";
import { BASE_URL } from "./apiPath.js";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10200,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
     withCredentials: true 
});

//Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response interceptor

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                 console.warn("Token expired or unauthorized");
                 localStorage.removeItem("token");
                //Redirect to login page
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server error, Please try again later")
            }
            
        } else if (error.code === "ECONABORTED") {
            console.error("Request Timeout. Please try again later")
        }
        return Promise.reject(error);
    }
);

export default axiosInstance