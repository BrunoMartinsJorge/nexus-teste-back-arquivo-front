import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosHttp = axios.create({
  baseURL: `http://localhost:3000`,
});

axiosHttp.interceptors.request.use((config) => {
  const token = getToken(config.url || "");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function getToken(url: string): string | null {
  if (url.startsWith("/auth")) return null;

  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return null;

  try {
    const payload: any = jwtDecode(accessToken);
    const expiracao = payload.exp * 1000;

    if (expiracao < Date.now()) {
      return null;
    }

    return accessToken;
  } catch {
    return null;
  }
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post("/auth/refresh", {
        refreshToken
      });
      const newAccessToken = response.data.access_token;
      localStorage.setItem("access_token", newAccessToken);
      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(error.config);
    }

    return Promise.reject(error);
  }
);

export default axiosHttp;
