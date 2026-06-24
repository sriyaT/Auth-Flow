import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/authApi";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const resetHandler = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (!password.trim()) {
        throw new Error("Password is required");
      }

      if (!confirmPassword.trim()) {
        throw new Error("Confirm password is required");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const result = await resetPassword({
        token,
        password,
      });
      setSuccessMsg("Password updated successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
      console.log("response", result);

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 text-black">
      {" "}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {" "}
        <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your new password below.
        </p>
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password </h1>
        {error && (
          <div className="mb-4 rounded-md bg-red-100 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 rounded-md bg-green-100 text-green-700 px-3 py-2 text-sm">
            {successMsg}
          </div>
        )}
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={resetHandler}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
