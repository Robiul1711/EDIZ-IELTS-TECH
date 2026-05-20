import axios from "axios";
// import { useAuth } from "./useAuth";

const useAxiosSecure = () => {

  // fallback to localStorage token value
  const access_token = localStorage.getItem("token") || null;

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 300000,
  });

  axiosSecure.interceptors.request.use((config) => {
    if (access_token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
