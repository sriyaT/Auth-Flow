import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { loginSuccess } from "./redux/slices/authSlice";
import { setInitialized } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      dispatch(loginSuccess(authData));
    }
    dispatch(setInitialized());
  }, [dispatch]);
  return (
    <div>
      <h1>Auth Project</h1>
      <AppRoutes />
    </div>
  );
}

export default App;
