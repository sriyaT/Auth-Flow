import authAxios from "./axios";

export const loginAuth = async (credentials) => {
  const response = await authAxios.post("/auth/login", credentials);
  return response.data;
};
export const profileAuth = async () => {
  const response = await authAxios.get("/auth/profile");
  return response.data;
};

export const registerAuth = async (credentials) => {
  const response = await authAxios.post("/auth/register", credentials);

  return response.data;
};

export const forgotPassword = async (credentials) => {
  const response = await authAxios.post("/auth/forgot-password", credentials);

  return response.data;
};

export const resetPassword = async (credentials) => {
  const response = await authAxios.post("/auth/reset-password", credentials);

  return response.data;
};
