import axios from "axios";
import { store } from "@/store/store";
import { selectToken } from "@/store/auth/selectors";
import { selectLanguage } from "@/store/ui/selectors";
import { toast } from "react-toastify";

// Base URL from environment or config
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/";

/**
 * Create Axios instance with base configuration
 */
export const baseAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds
});

/**
 * Request interceptor to inject token and language from Redux
 */
baseAxios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = selectToken(state);
    const language = selectLanguage(state) || "en";

    // Inject language header
    config.headers["Accept-Language"] = language;

    // Inject token if exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle errors and show toast messages
 */
baseAxios.interceptors.response.use(
  (response) => {
    // Show success message if message exists in response
    const message = response?.data?.message;
    if (message && response.config?.showToast !== false) {
      toast.success(message, {
        className: "font",
      });
    }
    return response;
  },
  (error) => {
    // Handle error response
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "An error occurred";

    // Show error toast (unless disabled)
    if (error.config?.showToast !== false) {
      toast.error(errorMessage, {
        className: "font",
      });
    }

    // Handle specific error cases
    if (error?.response?.status === 401) {
      // Unauthorized - you might want to logout user here
      // store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default baseAxios;

