const authService = require("../services/auth.service");
const emailService = require("../services/email.service");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await authService.register(username, email, password);

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const profile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await authService.getProfile(userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const GenerateRefreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        message: "missing refresh token",
      });
    }
    const newAccess_token = await authService.refreshToken(refresh_token);
    return res.status(200).json({
      success: true,
      newAccess_token,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await authService.logout(userId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const result = await authService.forgotPassword(userEmail);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Forgot Password Error:");
    console.error(err);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const sendEmail = async (req, res) => {
  try {
    const result = await emailService.sendEmail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email",
      text: "Hello from Auth Project",
    });

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const result = await authService.resetPassword(token, password);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  profile,
  GenerateRefreshToken,
  logout,
  forgotPassword,
  sendEmail,
  resetPassword,
};
