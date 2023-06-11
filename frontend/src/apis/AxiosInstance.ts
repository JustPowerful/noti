import axios, { RawAxiosRequestHeaders } from "axios";

const instance = axios.create({
  baseURL: "/api",
  headers: <RawAxiosRequestHeaders>{
    "Content-Type": "application/json",
    "x-access-token": localStorage.getItem("token"),
    "x-refresh-token": localStorage.getItem("refreshToken"),
  },
});

export const axiosPublic = instance;
