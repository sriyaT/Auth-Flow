import { useState } from "react";
import { forgotPassword } from "../../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const resetHandler = async () => {
    try {
      if (!email) {
        setLoading(true);
        throw new Error("Enter a valid Email!!");
      }
      const response = await forgotPassword({
        userEmail: email,
      });
      console.log("response", response);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };
  return (
    <div>
      <h1>Forgot Password</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => emailHandler(e)}
        placeholder="Enter email"
      />
      {error && <span>{error}</span>}
      <button onClick={resetHandler}>Send Reset Link</button>
    </div>
  );
};

export default ForgotPassword;
