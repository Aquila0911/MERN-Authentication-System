import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000",
});

export default axiosInstance;
