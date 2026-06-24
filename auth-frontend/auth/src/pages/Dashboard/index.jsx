import { useDispatch } from "react-redux";
import { logout, setProfile } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { profileAuth } from "../../api/authApi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.user.username);
  const email = useSelector((state) => state.auth.user.email);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };
  const profileHandler = async () => {
    isAuth && navigate("/profile");
    try {
      const response = await profileAuth();
      console.log("profile response", response?.user);
      dispatch(
        setProfile({
          username: response?.user?.username,
          email: response?.user?.email,
        })
      );
    } catch (err) {
      if (err) {
        console.log("err", err);
      }
    }
    !isAuth && navigate("/auth/login");
  };
  return (
    <div>
      <div>
        <h1>Welcome to Dashboard {username}!!</h1>
        <p>you're logged in with {email} </p>
        <div onClick={profileHandler}>Profile</div>

        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
