import {OTP} from '../models/otpModel.js';
import { sendEmail } from '../utils/mailer.js'; // Replace with your actual mailer
import jwt from 'jsonwebtoken';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  // ✅ Delete expired OTPs
  await OTP.deleteMany({ email, expiresAt: { $lte: Date.now() } });

  // ✅ Check for active OTP
  const activeOtp = await OTP.findOne({ email, expiresAt: { $gt: Date.now() } });

  if (activeOtp) {
    return res.status(429).json({ error: 'OTP already sent. Please wait before requesting again.' });
  }

  // ✅ Check if any OTP ever existed (for custom message)
  const previousOtp = await OTP.findOne({ email });

  // ✅ Create and send new OTP
  const otp = generateOTP();
  await OTP.create({
    email,
    otp,
    expiresAt: Date.now() + 1 * 60 * 1000, // 1 minute expiry
  });

  await sendEmail(email, `Your OTP is ${otp}`);

  const message = previousOtp ? 'OTP sent again' : 'OTP sent';
  res.json({ message });
};

// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp || otp.length !== 6) {
    return res.status(400).json({ error: 'Email and valid OTP are required' });
  }

  const record = await OTP.findOne({ email, otp });

  if (!record || record.expiresAt < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  await OTP.deleteOne({ _id: record._id });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1M' });
  res.json({ message: 'OTP verified', token });
};