import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3001/",
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
