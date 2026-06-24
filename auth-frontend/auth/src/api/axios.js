import axios from "axios";

const authAxios = axios.create({ baseURL: "http://localhost:5000/api" });
authAxios.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const accessToken = authData?.accessToken;
    console.log("accessToken", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("config.headers.Authorization", config.headers.Authorization);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default authAxios;
