import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/slices/authSlice";
import { loginAuth } from "../../api/authApi";
import { Link } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailHandler = (e) => {
    setEmail(e?.target?.value);

    setErrors({ ...errors, email: "" });
  };
  const passwordHandler = (e) => {
    setPassword(e?.target?.value);
    setErrors({ ...errors, password: "" });
  };

  const loginHandler = async () => {
    const newError = {};
    if (!email.trim()) {
      newError.email = "Email is required!!*";
    } else if (!emailRegex.test(email)) {
      newError.email = "Please enter a valid email";
    }
    if (!password.trim()) {
      newError.password = "Password is required!!*";
    } else if (password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }
    try {
      const response = await loginAuth({
        email: email,
        password: password,
      });

      dispatch(
        loginSuccess({
          user: {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
          },
          accessToken: response.user.token,
          refreshToken: response.user.refresh_token,
        })
      );
      const authData = {
        user: {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
        },
        accessToken: response.user.token,
        refreshToken: response.user.refresh_token,
      };
      localStorage.setItem("auth", JSON.stringify(authData));
      navigate("/auth/dashboard");
    } catch (error) {
      setServerError(error.response?.data?.message || "Invalid credentials");
      setServerError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back!! 👋🏻
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to your account!!
        </p>
        <div className="text-gray-500 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => emailHandler(e)}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition
                ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition
                ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
                value={password}
                onChange={(e) => passwordHandler(e)}
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="text-right mb-6">
            <Link
              className="text-blue-600 text-sm hover:underline"
              to="/auth/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4">
              {serverError}
            </div>
          )}
          <button
            disabled={loading}
            onClick={loginHandler}
            className="w-full bg-blue-600 text-gray-700 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
          <div>
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => navigate("/auth/register")}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
