/*
  401 HTTP Code refreshes the token when it happens
*/

import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { memoizedRefreshToken } from "./refreshToken";

axios.defaults.baseURL = "/api";
axios.interceptors.request.use(
  async (config) => {
    config.headers = <AxiosRequestHeaders>{
      "Content-Type": "application/json",
    }; // typescript refused to accept the access token and the refresh token attributes

    // so i set them seperatly
    config.headers.set("x-access-token", localStorage.getItem("token"));
    config.headers.set("x-refresh-token", localStorage.getItem("refreshToken"));

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
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
