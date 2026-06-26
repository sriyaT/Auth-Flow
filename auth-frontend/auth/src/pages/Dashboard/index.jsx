import { useDispatch, useSelector } from "react-redux";
import { logout, setProfile } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { profileAuth } from "../../api/authApi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };

  const profileHandler = async () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    try {
      const response = await profileAuth();

      dispatch(
        setProfile({
          username: response?.user?.username,
          email: response?.user?.email,
        })
      );

      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 shadow-md">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back,</h1>

            <p className="text-2xl font-semibold text-blue-600">
              {user?.username} 👋
            </p>

            <p className="mt-2 text-gray-500">Glad to see you again.</p>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-500">Username</p>

            <h2 className="mt-2 text-xl font-semibold text-gray-800">
              {user?.username}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-500">Email</p>

            <h2 className="mt-2 text-lg font-semibold text-gray-800 break-all">
              {user?.email}
            </h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={profileHandler}
              className="rounded-2xl bg-blue-600 py-4 text-gray-700 font-semibold shadow-lg transition hover:bg-blue-700"
            >
              👤 View Profile
            </button>

            <button
              onClick={logoutHandler}
              className="rounded-2xl border border-red-300 py-4 text-red-600 font-semibold transition hover:bg-red-50"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
