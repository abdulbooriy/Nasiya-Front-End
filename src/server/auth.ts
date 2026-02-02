import axios from "axios";

import axiosInstance, { API_URL } from "./api";

const authApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

authApi.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._isRetry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return authApi.request(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._isRetry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });

        if (refreshResponse.data.accessToken) {
          const newToken = refreshResponse.data.accessToken;
          localStorage.setItem("accessToken", newToken);
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return await authApi.request(originalRequest);
        }
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default authApi;
