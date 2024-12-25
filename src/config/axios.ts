import { BASE_URL, DEFAULT_TOKEN } from "./api";
import axios, { AxiosInstance } from "axios";
import { accessToken as refreshAccessToken } from "./auth";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const useInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config) => {
        const storedToken = localStorage.getItem("accessToken");
        const token = storedToken ? JSON.parse(storedToken) : DEFAULT_TOKEN;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            throw new Error("Primary token is missing");
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error?.config;
            const errorResponse = error?.response?.status;
            if (
                errorResponse &&
                errorResponse === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                try {
                    const storedRefreshToken = localStorage.getItem("accessToken");
                    const refreshToken = storedRefreshToken ? JSON.parse(storedRefreshToken) : refreshAccessToken;

                    if (refreshToken) {
                        const newToken = await refreshToken();
                        localStorage.setItem("accessToken", JSON.stringify(newToken));
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return axiosInstance(originalRequest);
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );
};

useInterceptor(axiosInstance);

export default axiosInstance;
