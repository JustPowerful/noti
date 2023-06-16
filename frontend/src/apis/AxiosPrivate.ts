// FOR THIS:
// server response must return 401 error status to refresh the token

import axios, { InternalAxiosRequestConfig } from "axios";
import { memoizedRefreshToken } from "./refreshToken";
axios.defaults.baseURL = "/api";
axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // config.headers = {
    //   "Content-Type": "application/json",
    //   // "x-access-token": localStorage.getItem("token"),
    //   // "x-refresh-token": localStorage.getItem("refreshToken"),
    // }
    config.headers.set("Content-Type", "application/json");
    config.headers.set("x-access-token", localStorage.getItem("token"));
    config.headers.set("x-refresh-token", localStorage.getItem("refreshToken"));
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response.status === 401 && !config.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result.token) {
        config.headers = {
          ...config.headers,
          authorization: `${result.token}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
