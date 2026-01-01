import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: "Server timed out ...",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = "";
  if (token) {
    config.headers.Authorization = "Bearer " +token;
  }
  return config;
});
// Response 
// Newrok => Axios Instance => (response interceptor) => UI Component
axiosInstance.interceptors.response.use((response) => {
  return response.data
}, (exception) => {
  // handle 
  if (+exception.status === 400 || +exception.status === 422) {
    // form validation faile 
    throw { ...exception.response.data, code: exception.status }
  } else if (exception.status === 403) {
    toast.error("You don't have permission to access this request")
    throw exception.response
  }
}
);

export default axiosInstance;
