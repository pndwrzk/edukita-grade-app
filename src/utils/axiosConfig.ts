import axios from "axios";
import { StoreCookie, removeCookie, getDataCookie } from "@/utils/configCookie";

export function axiosConfig() {
  const { accessToken, refreshAccessToken } = getDataCookie();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GRADE_SERVICE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 untuk refresh token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = refreshAccessToken;
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          // Request untuk refresh token
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_GRADE_SERVICE}/auth/refresh-token`,
            { refresh_token: refreshToken }
          );

          const resultData = response.data;
          StoreCookie(resultData.data);

          // Set token baru dan retry request
          originalRequest.headers.Authorization = `Bearer ${resultData.data.token_access}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          removeCookie();
          if (refreshError instanceof Error) {
            return Promise.reject(refreshError);
          } else {
            return Promise.reject(new Error("Unknown error occurred during token refresh"));
          }
        }
      }

      // Return error response
      return Promise.reject(error instanceof Error ? error : new Error(error));
    }
  );

  return instance;
}
