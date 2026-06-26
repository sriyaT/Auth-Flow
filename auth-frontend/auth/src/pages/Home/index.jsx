import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {/* Hero Card */}
        <div className="rounded-3xl bg-white shadow-2xl p-10">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl">
              🔐
            </div>

            <h1 className="text-5xl font-bold text-gray-800">AuthFlow</h1>

            <p className="mt-4 text-lg text-gray-500">
              A modern authentication system built using
              <span className="font-semibold text-blue-600">
                {" "}
                React, Node.js, Express, JWT & PostgreSQL
              </span>
            </p>
          </div>

          {/* Logged In */}
          {isAuthenticated ? (
            <div className="mt-12">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome back, {user?.username}! 👋
                </h2>

                <p className="mt-2 text-gray-600">
                  You are successfully logged in.
                </p>

                <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() =>
                    isAuthenticated
                      ? navigate("/auth/dashboard")
                      : navigate("/auth/login")
                  }
                  className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-gray-700 transition hover:bg-blue-700"
                >
                  🚀 Dashboard
                </button>

                <button
                  onClick={() =>
                    isAuthenticated
                      ? navigate("/profile")
                      : navigate("/auth/login")
                  }
                  className="flex-1 rounded-xl border border-gray-300 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  👤 My Profile
                </button>
              </div>
            </div>
          ) : (
            /* Logged Out */
            <div className="mt-12">
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => navigate("/auth/login")}
                  className="rounded-xl bg-blue-600 py-4 font-semibold text-gray-700 transition hover:bg-blue-700"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/auth/register")}
                  className="rounded-xl border border-blue-300 py-4 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Built with ❤️ using React • Redux Toolkit • Express • PostgreSQL • JWT
        </div>
      </div>
    </div>
  );
};

export default Home;
