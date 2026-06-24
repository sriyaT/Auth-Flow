import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("Home component rendered");
  const auth = useSelector((state) => state.auth);
  console.log("auth", auth);

  const loginHandler = () => {
    dispatch(
      loginSuccess({
        user: {
          id: 1,
          username: "sriya",
          email: "sriya@gmail.com",
        },
        isAuthenticated: true,
        accessToken: "dummy-access-token",
        refreshToken: "dummy-refresh-token",
      })
    );
  };
  const dashboardHandler = () => {
    navigate("/auth/dashboard");
  };
  const profileHandler = () => {
    navigate("/profile");
  };
  return (
    <div>
      <h1>Home</h1>
      {!auth.isAuthenticated && <button onClick={loginHandler}>Login</button>}
      {auth.isAuthenticated && (
        <div onClick={dashboardHandler}>Go To Dashboard</div>
      )}
      {auth.isAuthenticated && (
        <div onClick={profileHandler}>Go To Profile</div>
      )}
    </div>
  );
};

export default Home;
