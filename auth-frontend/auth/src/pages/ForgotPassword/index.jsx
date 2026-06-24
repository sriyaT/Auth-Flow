import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const resetHandler = async () => {
    setError("");
    setSuccessMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if (!email.trim()) {
        throw new Error("Email is required");
      }

      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email");
      }

      setLoading(true);

      const response = await forgotPassword({
        userEmail: email,
      });

      console.log(response);

      setSuccessMsg(
        "✅ Reset link sent successfully. Please check your inbox and spam folder."
      );

      setEmail("");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-indigo-100 flex items-center justify-center px-4">
      {" "}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {" "}
        <div className="text-center mb-8">
          {" "}
          <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl mb-4">
            🔑{" "}
          </div>
          ```
          <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>
          <p className="text-gray-500 mt-2">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {successMsg}
          </div>
        )}
        <div className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />

          <button
            onClick={resetHandler}
            disabled={loading}
            className="w-full rounded-xl bg-pink-600 py-3 text-white font-semibold transition hover:bg-pink-700 disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <button
              onClick={() => navigate("/auth/login")}
              className="text-pink-600 font-medium hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
