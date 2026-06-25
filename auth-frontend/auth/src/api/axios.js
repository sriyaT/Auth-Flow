import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const accessToken = authData?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authAxios;
