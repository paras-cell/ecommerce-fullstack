import express from 'express';
import { sendRegistrationOtp, verifyRegistrationOtp } from '../controllers/authController.js';

const router = express.Router();

router.post('/send', sendRegistrationOtp);
router.post('/verify', verifyRegistrationOtp);

export default router;