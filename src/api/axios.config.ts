import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { envConfig } from "@/config";

const axiosConfig: AxiosRequestConfig = {
  baseURL: envConfig.api.baseUrl,
  timeout: envConfig.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiClient: AxiosInstance = axios.create(axiosConfig);

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          console.error("Unauthorized - Redirecting to login");
          localStorage.removeItem("authToken");
          break;
        case 403:
          console.error("Forbidden - Access denied");
          break;
        case 404:
          console.error("Not Found");
          break;
        case 500:
          console.error("Server Error");
          break;
        default:
          console.error("Error:", status);
      }
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  },
);
