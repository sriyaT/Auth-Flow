import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
  isInitialized: false,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = {};
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    setProfile: (state, action) => {
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
    },
    forgotPassword: (state, action) => {
      state.user.resetPassword = action.payload.password;
      state.user.resetToken = action.payload.token;
    },
  },
});

export default authSlice.reducer;
export const { loginSuccess, logout, clearError, setInitialized, setProfile } =
  authSlice.actions;
