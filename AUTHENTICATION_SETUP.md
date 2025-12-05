# Authentication System Documentation

## Overview
This is a complete user authentication system with two methods:
1. **Email OTP Login** (Quick login with one-time password)
2. **Password-Based Login** (Register → Verify Email OTP → Create Password → Login with Email/Username)

---

## 🔐 Features

### Registration Flow
1. User enters email
2. System sends OTP to email
3. User verifies OTP
4. User creates username, full name, and password
5. User is registered and logged in automatically

### Login Flow
- Login with email or username + password
- Password validation (strong password requirements)
- JWT token-based authentication
- Refresh token for session management

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- Password strength indicator on registration

---

## 📁 Project Structure

### Backend (`server/`)

```
server/
├── models/
│   ├── userModel.js           # User schema with password
│   └── otpModel.js            # OTP schema
├── controllers/
│   ├── authController.js      # Registration & login logic
│   └── otpController.js       # OTP logic (old)
├── routes/
│   ├── authRoutes.js          # Auth endpoints
│   └── otproutes.js           # OTP endpoints
├── middleware/
│   └── authMiddleware.js      # JWT verification
├── utils/
│   ├── passwordUtils.js       # Password hashing & validation
│   └── mailer.js              # Email sending
├── server.js                  # Main server file
└── package.json
```

### Frontend (`frontend/src/`)

```
frontend/src/
├── auth/
│   ├── RegisterPage.jsx       # Registration page
│   ├── NewLoginPage.jsx       # Password login page
│   ├── register.css           # Registration styles
│   └── newlogin.css           # Login styles
├── context/
│   └── AuthContext.jsx        # Auth state management
├── services/
│   └── authAPI.js             # API calls to backend
├── ProtectedRoute.jsx         # Protected route wrapper
├── App.jsx                    # Routes configuration
└── main.jsx                   # App entry with AuthProvider
```

---

## 🛠️ Setup Instructions

### Backend Setup

1. **Install Dependencies**
```bash
cd server
npm install
# installs bcryptjs for password hashing
```

2. **Configure Environment**
Create a `.env` file in `server/` directory:
```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/ecommerce

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

FRONTEND_URL=http://localhost:5173
```

**Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

3. **Start Server**
```bash
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

1. **Install Dependencies** (already done)
```bash
cd frontend
npm install
```

2. **Start Development Server**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### 1. Register - Send OTP
```
POST /api/auth/register/send-otp
Content-Type: application/json

{
  "email": "user@example.com"
}

Response:
{
  "message": "OTP sent to email"
}
```

#### 2. Register - Verify OTP & Create Account
```
POST /api/auth/register/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456",
  "username": "johndoe",
  "fullName": "John Doe",
  "password": "SecurePass123"
}

Response:
{
  "message": "Registration successful",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "username": "johndoe",
    "fullName": "John Doe"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

#### 3. Login
```
POST /api/auth/login
Content-Type: application/json

{
  "emailOrUsername": "johndoe",
  "password": "SecurePass123"
}

Response:
{
  "message": "Login successful",
  "user": { ... },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

#### 4. Refresh Access Token
```
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}

Response:
{
  "accessToken": "eyJhbGc..."
}
```

#### 5. Get Current User
```
GET /api/auth/me
Authorization: Bearer <accessToken>

Response:
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "username": "johndoe",
    "fullName": "John Doe",
    "createdAt": "2025-12-05T10:00:00Z"
  }
}
```

#### 6. Update Profile
```
PUT /api/auth/update-profile
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "fullName": "John Doe Updated",
  "phone": "+1234567890",
  "profileImage": "url-to-image"
}

Response:
{
  "message": "Profile updated",
  "user": { ... }
}
```

#### 7. Change Password
```
POST /api/auth/change-password
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "oldPassword": "SecurePass123",
  "newPassword": "NewSecurePass456"
}

Response:
{
  "message": "Password changed successfully"
}
```

---

## 🎨 Frontend Usage

### 1. Using AuthProvider
Wrap your app with `AuthProvider` (already done in `main.jsx`):
```jsx
import { AuthProvider } from "./context/AuthContext";

<AuthProvider>
  <App />
</AuthProvider>
```

### 2. Using useAuth Hook
```jsx
import { useAuth } from "./context/AuthContext";

function MyComponent() {
  const { user, token, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Welcome, {user.fullName}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Protected Routes
```jsx
<Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <WishlistPage />
    </ProtectedRoute>
  }
/>
```

### 4. Making API Calls
```jsx
import { authAPI } from "../services/authAPI";
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { token, updateUser } = useAuth();

  const handleUpdateProfile = async () => {
    const result = await authAPI.updateProfile(token, {
      fullName: "New Name",
      phone: "+1234567890"
    });
    
    if (!result.error) {
      updateUser(result.user);
    }
  };
}
```

---

## 📱 User Registration Flow (Step by Step)

1. **User clicks "Register"** → Goes to `/register`
2. **Enters email** → Clicks "Send OTP"
3. **Backend sends OTP** → Email received
4. **User enters OTP** → Clicks "Verify OTP"
5. **Form progresses to Step 2**
6. **User enters details:**
   - Full Name
   - Username
   - Password (with strength indicator)
   - Confirm Password
7. **Clicks "Complete Registration"**
8. **Backend verifies everything** → Creates user → Returns tokens
9. **User is logged in** → Redirected to home page

---

## 🔑 User Login Flow (Step by Step)

1. **User clicks "Login"** → Goes to `/login`
2. **Two options:**
   - **Password Login:** Enter email/username + password
   - **OTP Login:** Goes to `/otp-login`
3. **Password Login:**
   - Enter email/username
   - Enter password
   - Submit
   - Backend validates
   - Returns tokens
4. **User is logged in** → Redirected to home page

---

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT tokens for stateless authentication
- ✅ Password strength validation
- ✅ Email verification via OTP
- ✅ Secure refresh tokens
- ✅ Protected routes with middleware
- ✅ Authorization headers with Bearer tokens

---

## 🐛 Troubleshooting

### "OTP already sent. Please wait before requesting again."
- OTP expires in 5 minutes
- Wait for expiration or check email again

### "Invalid or expired OTP"
- Make sure OTP is 6 digits
- Check if OTP hasn't expired (5 minutes)
- Request a new OTP

### "Email already registered"
- Use a different email
- Or login if you already have an account

### "Password is too weak"
- Use at least 8 characters
- Include uppercase, lowercase, and numbers

### "Invalid token" / "Unauthorized"
- Token has expired
- Use refresh token to get new access token
- Login again

### Email not received
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASS in `.env`
- For Gmail, make sure you're using App Password

---

## 📚 Dependencies Added

### Backend
- `bcryptjs` - Password hashing
- `jsonwebtoken` - Already present, for tokens
- `express` - Already present, for routing
- `mongoose` - Already present, for database

### Frontend
- No new dependencies! Uses existing React/React Router

---

## 🚀 Next Steps

1. ✅ Set up MongoDB
2. ✅ Configure Gmail credentials in `.env`
3. ✅ Install dependencies: `npm install`
4. ✅ Start server: `npm start` (in server directory)
5. ✅ Start frontend: `npm run dev` (in frontend directory)
6. ✅ Visit `http://localhost:5173`
7. ✅ Test registration and login flows

---

## 💡 Tips

- **Remember credentials:** Once registered, save your username and password for login
- **OTP expiry:** OTP is valid for 5 minutes
- **Token expiry:** Access token valid for 7 days, refresh token for 30 days
- **Security:** Never share tokens or passwords
- **Development:** Use strong JWT secrets in production

---

**Created:** December 5, 2025
**Status:** ✅ Complete and Ready to Use
