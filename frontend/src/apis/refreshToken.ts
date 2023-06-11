import mem from "mem";
import { axiosPublic } from "./AxiosInstance";

const refreshTokenFn = async () => {
  try {
    const response = await axiosPublic.post("/auth/refresh");
    const data = response.data;
    if (data.success) {
      localStorage.setItem("token", data.token);
    } else {
      // authorization was removed from database
      // so we delete browser data
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
    return data;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
