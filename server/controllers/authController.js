import { User } from '../models/userModel.js';
import { OTP } from '../models/otpModel.js';
import { sendEmail } from '../utils/mailer.js';
import jwt from 'jsonwebtoken';
import {
  hashPassword,
  comparePassword,
  validatePasswordStrength,
} from '../utils/passwordUtils.js';

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ============ REGISTRATION FLOW ============

/**
 * Step 1: Send OTP for registration
 */
export const sendRegistrationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Email already registered. Please login instead.' });
    }

    // Delete expired OTPs
    await OTP.deleteMany({ email, expiresAt: { $lte: Date.now() } });

    // Check for active OTP
    const activeOtp = await OTP.findOne({
      email,
      expiresAt: { $gt: Date.now() },
    });

    if (activeOtp) {
      return res.status(429).json({
        error: 'OTP already sent. Please wait before requesting again.',
      });
    }

    // Create and send new OTP
    const otp = generateOTP();
    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
    });

    await sendEmail(
      email,
      `Your OTP for registration is: ${otp}. This OTP will expire in 5 minutes.`
    );

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Registration OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

/**
 * Step 2: Verify OTP and create user profile
 */
export const verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp, username, fullName, password } = req.body;

    // Validate inputs
    if (!email || !otp || !username || !fullName || !password) {
      return res.status(400).json({
        error: 'Email, OTP, username, full name, and password are required',
      });
    }

    if (otp.length !== 6) {
      return res.status(400).json({ error: 'OTP must be 6 digits' });
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: 'Password is weak',
        details: passwordValidation.errors,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Email or username already in use' });
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      email,
      username,
      fullName,
      password: hashedPassword,
      isEmailVerified: true,
    });

    await user.save();

    // Delete OTP after successful registration
    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Registration verification error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// ============ LOGIN FLOW ============

/**
 * Login with email/username and password
 */
export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: 'Email/username and password are required' });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Invalid email/username or password' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res
        .status(403)
        .json({ error: 'Your account has been deactivated' });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: 'Invalid email/username or password' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const newAccessToken = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { fullName, phone, profileImage } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, phone, profileImage },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

/**
 * Change password
 */
export const changePassword = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { oldPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: 'Old password and new password are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify old password
    const isOldPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({ error: 'Old password is incorrect' });
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: 'New password is weak',
        details: passwordValidation.errors,
      });
    }

    // Hash and save new password
    user.password = await hashPassword(newPassword);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
};
