import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element }) => {
  const auth = useSelector((state) => state.auth);

  const { isAuthenticated, isInitialized } = auth;
  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  return element;
};
export default ProtectedRoutes;
