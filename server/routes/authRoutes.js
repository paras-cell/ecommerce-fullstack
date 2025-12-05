import express from 'express';
import {
  sendRegistrationOtp,
  verifyRegistrationOtp,
  login,
  refreshAccessToken,
  getCurrentUser,
  updateProfile,
  changePassword,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============ REGISTRATION ============
router.post('/register/send-otp', sendRegistrationOtp);
router.post('/register/verify-otp', verifyRegistrationOtp);

// ============ LOGIN ============
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);

// ============ PROTECTED ROUTES ============
router.get('/me', verifyToken, getCurrentUser);
router.put('/update-profile', verifyToken, updateProfile);
router.post('/change-password', verifyToken, changePassword);

export default router;
