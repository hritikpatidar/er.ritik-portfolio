import { baseUrl } from "@/src/config";
import { clearLocalStorage, getItemLocalStorage } from "@/src/Utils/browserServices";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: baseUrl.adminBaseUrl
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const adminToken = getItemLocalStorage("admin_token");
        config.headers = {
            Authorization: `Bearer ${adminToken}`,
            // 'Content-Type': 'application/json',
        };
        return config;
    }
);

axiosInstance.interceptors.response.use(undefined, (error) => {
    if (error.message === "Network Error" && !error.response) {
        console.log("Network error - make sure API is running!");
    }
    if (error.response) {
        const { status } = error.response;
        if (status === 404) {
            console.log("Not Found");
        }
        if (status === 401) {
            if (typeof window !== "undefined") {
                window.location.href = "/";
                clearLocalStorage();
                console.log("Your session has expired, please login again");
            }
        }
        return error.response;
    } else {
        console.log(error);
        return error;
    }
});

export default axiosInstance;
