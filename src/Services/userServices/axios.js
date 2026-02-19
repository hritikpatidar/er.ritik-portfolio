import { baseUrl } from "@/src/config";
import { clearLocalStorage, getItemLocalStorage } from "@/src/Utils/browserServices";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: baseUrl.apiBaseURL
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const userToken = getItemLocalStorage("user_token");
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response, // Allow successful responses to pass through
    (error) => {
        if (error.message === "Network Error" && !error.response) {
            console.log("Network error - make sure API is running!");
        } else if (error.response) {
            const { status } = error.response;
            if (status === 404) {
                // Handle 404 error, but don't throw it as an error
                console.log("Not Found");
                return Promise.resolve(error.response); // Still resolve, so it doesn't go to catch
            } else if (status === 401) {
                if (typeof window !== "undefined") {
                    window.location.href = "/";
                    clearLocalStorage();
                    console.log("Your session has expired, please login again");
                }
            }else if (status === 504) {
                console.log("Server timeout, please try again later.");
                return Promise.resolve(error.response); // Resolve, so it doesn't go to catch
            } else {
                console.log("Error response:", error.response.data);
                return Promise.resolve(error.response); // Still resolve, so it doesn't go to catch
            }
        } else {
            console.log("Error:", error);
        }
        return Promise.reject(error); // Continue rejecting other errors
    }
);

export default axiosInstance;
