import axios from "axios";
import { baseURL, refreshTokenPath } from "./endpoint";
import { asyncStorage } from "@/utils/asyncStorage";

const defaultHeader = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Accept: "application/json",
};

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: defaultHeader,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = await asyncStorage.getAccessToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  async (response) => {
    if (response.config.url === "/auth/login" && response.status === 201) {
      const tokens = response.data.data.accessToken;
      await asyncStorage.setToken(tokens);
    } else if (response.config.url === "/auth/login-google-mobile") {
      const tokens = response.data.data.accessToken;
      await asyncStorage.setToken(tokens);
    }
    return response;
  },
  async (error) => {
    return Promise.reject(handleError(error));
  }
);

const handleError = (error: any) => {
  const { data } = error.response;

  console.error(error);
  return data;
};

const clearAuthToken = async () => {
  await asyncStorage.clearToken();
};

export default instance;
