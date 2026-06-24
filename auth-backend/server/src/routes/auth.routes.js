const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware, authController.profile);
router.post("/token/refresh", authController.GenerateRefreshToken);
router.post("/logout", authMiddleware, authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/test-email", authController.sendEmail);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
