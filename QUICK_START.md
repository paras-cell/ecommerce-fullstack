# Quick Start Guide - Authentication System

## 🚀 Get Started in 5 Minutes

### Step 1: Backend Configuration
```bash
cd server
```

Edit `.env` file (create from `.env.example`):
```env
MONGO_URI=mongodb://localhost:27017/ecommerce
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=change-this-to-something-random
```

**Get Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Create App Password for "Mail" on "Windows Computer"
4. Use generated 16-character password as `EMAIL_PASS`

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Server
```bash
npm start
# Server runs on http://localhost:5000
```

### Step 4: Frontend (in another terminal)
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📋 User Registration Checklist

- [ ] User registers at `/register`
- [ ] Receives OTP in email
- [ ] Verifies OTP (valid for 5 minutes)
- [ ] Enters: Full Name, Username, Password, Confirm Password
- [ ] Password must be strong (8+ chars, uppercase, lowercase, numbers)
- [ ] Successfully registered and logged in!
- [ ] User data saved in MongoDB

---

## 🔑 User Login Checklist

**Option 1: Password Login**
- [ ] Go to `/login`
- [ ] Enter email OR username
- [ ] Enter password
- [ ] Click Login
- [ ] Receive access token
- [ ] Redirected to home page

**Option 2: OTP Login**
- [ ] Go to `/otp-login` (or click "Login with OTP")
- [ ] Enter email
- [ ] Receive OTP
- [ ] Verify OTP
- [ ] User is logged in

---

## 📂 New Files Created

### Backend
```
server/
├── models/userModel.js              ← User with password
├── controllers/authController.js    ← Auth logic
├── routes/authRoutes.js             ← Auth endpoints
├── middleware/authMiddleware.js     ← JWT verification
├── utils/passwordUtils.js           ← Password hashing
└── .env.example                     ← Config template
```

### Frontend
```
frontend/src/
├── auth/
│   ├── RegisterPage.jsx             ← Registration form
│   ├── NewLoginPage.jsx             ← Password login form
│   ├── register.css
│   └── newlogin.css
├── context/AuthContext.jsx          ← State management
├── services/authAPI.js              ← API calls
└── ProtectedRoute.jsx               ← Protected routes (updated)
```

---

## 🧪 Test the System

### Test Registration
```
1. Go to http://localhost:5173/register
2. Enter your email
3. Click "Send OTP"
4. Check email for OTP
5. Enter OTP (valid for 5 minutes)
6. Fill in details:
   - Full Name: John Doe
   - Username: johndoe
   - Password: SecurePass123 (must have uppercase, lowercase, number)
   - Confirm: SecurePass123
7. Click "Complete Registration"
8. You should be logged in!
```

### Test Login
```
1. Go to http://localhost:5173/login
2. Enter "johndoe" (or your email)
3. Enter password: SecurePass123
4. Click "Login"
5. You should be logged in!
```

### Test Protected Routes
```
1. Go to http://localhost:5173/wishlist (without login)
   → Should redirect to /login
2. Login first
3. Go to http://localhost:5173/wishlist
   → Should show wishlist (you're authenticated!)
```

---

## 🔍 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: "user@example.com",        // unique
  username: "johndoe",               // unique
  password: "hashed_password",       // bcrypt hashed
  fullName: "John Doe",
  phone: "+1234567890",
  profileImage: "url",
  isEmailVerified: true,
  isActive: true,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Collection
```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  otp: "123456",
  expiresAt: Date  // Auto-deletes after 5 minutes
}
```

---

## 🔐 Tokens Structure

### Access Token (Valid 7 days)
```
Header: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Payload: {
  userId: "...",
  email: "user@example.com",
  username: "johndoe",
  iat: 1733385600,
  exp: 1733990400
}
```

### Refresh Token (Valid 30 days)
```
Used to get new access token when it expires
```

---

## 📞 API Quick Reference

| Method | Endpoint | Body | Auth |
|--------|----------|------|------|
| POST | `/api/auth/register/send-otp` | `{email}` | ❌ |
| POST | `/api/auth/register/verify-otp` | `{email, otp, username, fullName, password}` | ❌ |
| POST | `/api/auth/login` | `{emailOrUsername, password}` | ❌ |
| POST | `/api/auth/refresh-token` | `{refreshToken}` | ❌ |
| GET | `/api/auth/me` | — | ✅ |
| PUT | `/api/auth/update-profile` | `{fullName, phone, profileImage}` | ✅ |
| POST | `/api/auth/change-password` | `{oldPassword, newPassword}` | ✅ |

✅ = Requires Authorization header with Bearer token

---

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot GET /api/auth/..." | Server not running. Start with `npm start` |
| "Email already registered" | Use different email or login instead |
| "OTP already sent" | Wait 5 minutes or check spam folder |
| "Invalid password" | Must have 8+ chars, uppercase, lowercase, number |
| "CORS error" | Check frontend URL in server CORS config |
| "Email not received" | Check spam, verify EMAIL_PASS is correct |
| "Token expired" | Use refresh-token endpoint to get new token |

---

## 💾 Password Requirements

✅ **Valid:** `SecurePass123`
- 8+ characters
- Uppercase: S
- Lowercase: ecurerass
- Number: 123

❌ **Invalid:** `password`
- No uppercase
- No numbers
- Too common

---

## 🎯 What's Next?

1. ✅ User registration with email verification
2. ✅ User login with password
3. ✅ Protected routes
4. ⏳ Add user profile picture upload
5. ⏳ Add password reset via email
6. ⏳ Add two-factor authentication
7. ⏳ Add social login (Google, GitHub)
8. ⏳ Add user settings page

---

## 📝 Notes

- All passwords are hashed with bcryptjs (10 rounds)
- Tokens are JWT-based and stateless
- OTP valid for 5 minutes from generation
- Access tokens valid for 7 days
- Refresh tokens valid for 30 days
- Email sending requires Gmail or similar SMTP

---

**Last Updated:** December 5, 2025
**Version:** 1.0
**Status:** ✅ Production Ready
