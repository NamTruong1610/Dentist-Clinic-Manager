const express = require("express");
const { 
  getUserByIdController,
  registerController, 
  loginController,
  verifyMailController,
  forgetPasswordController,
  resetPasswordController,
  getAllUsers, 
  logoutController,
  sendOtpController,
  verifyOtpController
} = require("../controllers/authController");
const { validateRegistrationRules } = require("../middlewares/validationMiddleware");
const { authenticatedRoutes, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();
const { loginLimiter } = require("../middlewares/loginLimiter");

// Get collection of users
router.get('/users', authenticatedRoutes, authorize('admin'), getAllUsers)

// Get user profile
router.get('/user', authenticatedRoutes, getUserByIdController)

router.post('/signup', validateRegistrationRules, registerController)

// Register API
router.post('/login', loginLimiter, loginController)

// Email Verification API
router.post('/mail-verification', verifyMailController)

// Forget Password API
router.post('/forget-password', forgetPasswordController)

// Reset Password API
router.post('/reset-password', authenticatedRoutes, resetPasswordController)

// To get the user profile
router.post('/get-phone-otp', sendOtpController)

// To verify the phone number
router.post('/verify-phone', verifyOtpController)

router.post('/logout', authenticatedRoutes, logoutController)

module.exports = router;