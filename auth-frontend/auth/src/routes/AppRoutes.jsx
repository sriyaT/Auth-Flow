import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/auth/dashboard"
        element={<ProtectedRoutes element={<Dashboard />} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoutes element={<Profile />} />}
      />
    </Routes>
  );
};
export default AppRoutes;
