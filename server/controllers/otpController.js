import OTP from '../models/otpModel.js';
import { sendEmail } from '../utils/mailer.js';
import jwt from 'jsonwebtoken';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const existing = await OTP.findOne({ email });
  if (existing && existing.expiresAt > Date.now()) {
    return res.status(429).json({ error: 'OTP already sent. Please wait before requesting again.' });
  }

  const otp = generateOTP();
  await OTP.create({ email, otp, expiresAt: Date.now() + 5 * 60 * 1000 });
  await sendEmail(email, `Your OTP is ${otp}`);

  res.json({ message: 'OTP sent' });
  console.log("Request body:", req.body);
};

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

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'OTP verified', token });
};