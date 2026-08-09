import axios from "axios";
import { toast } from "react-toastify";

// Attach the JWT (if present) to every request, and log the user out on 401.
// Imported once from src/index.js so it applies app-wide.
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let redirecting = false;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem("accessToken");
      if (!redirecting && window.location.pathname !== "/") {
        redirecting = true;
        toast.info("Your session has expired. Please log in again.", { position: "top-center", autoClose: 3000, hideProgressBar: true });
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
