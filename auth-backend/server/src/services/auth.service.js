const userRepository = require("../repositories/user.repository");
const emailService = require("../services/email.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const register = async (username, email, password) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email Already Exists !!");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser(username, email, passwordHash);

  return user;
};

const login = async (email, password) => {
  const existingUser = await userRepository.findByEmail(email);
  if (!existingUser) {
    throw new Error("User not found!!");
  }
  const isMatch = await bcrypt.compare(password, existingUser.password_hash);
  if (!isMatch) {
    throw new Error("Invalid Credentials !!");
  }
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
  };

  const secret = process.env.JWT_SECRET;
  const jwtToken = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
  const refresh_secret = process.env.JWT_REFRESH_SECRET;
  const jwtRefreshToken = jwt.sign(payload, refresh_secret, {
    expiresIn: "2d",
  });

  await userRepository.saveRefreshToken(existingUser.id, jwtRefreshToken);
  return {
    id: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    token: jwtToken,
    refresh_token: jwtRefreshToken,
  };
};

const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("user not found!!");
  }
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};
const getProfileByEmail = async (userEmail) => {
  const user = await userRepository.findByEmail(userEmail);
  if (!user) {
    throw new Error("user not found!!");
  }
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

const refreshToken = async (token) => {
  const refresh_secret = process.env.JWT_REFRESH_SECRET;

  const decoded = jwt.verify(token, refresh_secret);
  const user = await userRepository.findById(decoded.id);
  if (!user) {
    throw new Error("No user found");
  }
  if (user.refresh_token !== token) {
    throw new Error("Invalid refresh token!!");
  }
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role || "user",
  };
  const secret = process.env.JWT_SECRET;
  const newAccessToken = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
  const newRefreshToken = jwt.sign(payload, secret, {
    expiresIn: "2d",
  });
  await userRepository.saveRefreshToken(user.id, newRefreshToken);
  return {
    success: true,
    token: newAccessToken,
    refresh_token: newRefreshToken,
    expiresIn: "1h",
  };
};

const logout = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("user not found!!");
  }
  await userRepository.saveRefreshToken(userId, null);
  return {
    success: true,
    message: "Logged out successfully",
  };
};

const forgotPassword = async (userEmail) => {
  const user = await userRepository.findByEmail(userEmail);
  if (!user) {
    throw new Error("user not found!!");
  }
  const resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000);
  const reset_token = crypto.randomUUID();
  await userRepository.resetPassword(reset_token, resetTokenExpiry, userEmail);
  const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${reset_token}`;
  await emailService.sendEmail({
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: "Reset Your Password",
    text: `Click here to reset your password: ${resetUrl}`,
  });

  return {
    success: true,
    message: "Password reset token generated successfully",
  };
};

const resetPassword = async (token, password) => {
  const user = await userRepository.findByResetToken(token);
  if (!user) {
    throw new Error("Invalid reset token");
  }
  const now = new Date();

  if (now > user.reset_token_expiry) {
    throw new Error("Reset token has expired");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  await userRepository.updatePassword(passwordHash, user.id);
  return {
    success: true,
    message: "Password updated successfully",
  };
};
module.exports = {
  register,
  login,
  getProfile,
  refreshToken,
  logout,
  getProfileByEmail,
  forgotPassword,
  resetPassword,
};
