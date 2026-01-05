import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 60000,
  timeoutErrorMessage: "Server timed out...",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});
// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("_at");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

    if (import.meta.env.DEV) {
      console.log("Token attached:", token.substring(0, 10) + "...");
    }
  }
  return config;
}, (error) => {
  console.error("Request interceptor error:", error);
  return Promise.reject(error);
});

// Response Interceptor - THIS IS CRITICAL
axiosInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`✅ [${response.status}] ${response.config.url}`);
      console.log("Response data:", response.data);
    }
    return response.data
  },
  (error) => {
    console.error("API Error:", error);
    if (error.response) {
      const { status, data } = error.response;

      if (data?.msg || data?.error) {
        toast.error(data.msg || data.error);
      } else {
        switch (status) {
          case 400:
            toast.error("Bad Request");
            break;
          case 401:
            toast.error("Unauthorized. Please log in.");
            break;
          case 403:
            toast.error("Forbidden. You don't have permission.");
            break;
          case 404:
            toast.error("Resource not found.");
            break;
          case 500:
            toast.error("Internal Server Error. Please try again later.");
            break;
          default:
            toast.error(`An error occurred`);
        }
      }

      //throw error to be handled locally as well
      throw {
        code: status,
        message: data?.msg || data?.error || 'An error occurred',
        data: data
      };
    } else if (error.request) {
      toast.error("No response from server. Please check your network.");
      throw { message: "No response from server" };
    } else {
      toast.error("Request error: " + error.message);
      throw { message: error.message };
    }
  }
);

export default axiosInstance