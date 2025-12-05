# Complete Authentication Flow Diagram

## 📊 Registration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    REGISTRATION FLOW                        │
└─────────────────────────────────────────────────────────────┘

USER                          FRONTEND                   BACKEND
  │                              │                          │
  │──── STEP 1: SEND EMAIL ──────>                          │
  │ Click "Send OTP"             │                          │
  │                              │──POST /register/send-otp─>│
  │                              │                          │
  │                              │   Generate OTP           │
  │                              │   Save to DB             │
  │                              │   Send Email             │
  │                              │<──── {message: "..."}───│
  │<────── OTP Sent (Email) ─────│                          │
  │                              │                          │
  │                              │                          │
  │──── STEP 2: VERIFY OTP ──────>                          │
  │ Enter: OTP                   │                          │
  │ Progress to STEP 2           │ (Just move to next form) │
  │                              │                          │
  │                              │                          │
  │──── STEP 3: ENTER DETAILS ──>                           │
  │ Enter:                       │                          │
  │ - Full Name                  │                          │
  │ - Username                   │                          │
  │ - Password                   │                          │
  │ - Confirm Password           │                          │
  │ Click "Complete Registration"│                          │
  │                              │                          │
  │                              │──POST /register/verify-otp──>│
  │                              │ {email, otp, username,   │
  │                              │  fullName, password}     │
  │                              │                          │
  │                              │   Verify OTP             │
  │                              │   Hash Password          │
  │                              │   Create User in DB      │
  │                              │   Generate Tokens        │
  │                              │                          │
  │                              │<─ {user, accessToken,────│
  │                              │   refreshToken}         │
  │<────── Login Success ────────│                          │
  │ Saved to localStorage        │                          │
  │ Redirected to Home           │                          │
  │                              │                          │
```

---

## 🔑 Login Flow

```
┌─────────────────────────────────────────────────────────────┐
│                       LOGIN FLOW                            │
└─────────────────────────────────────────────────────────────┘

USER                          FRONTEND                   BACKEND
  │                              │                          │
  │─ Go to /login ──────────────>│                          │
  │                              │                          │
  │─ Enter Email/Username ──────>│                          │
  │─ Enter Password ────────────>│                          │
  │─ Click "Login" ─────────────>│                          │
  │                              │                          │
  │                              │──POST /login────────────>│
  │                              │ {emailOrUsername,        │
  │                              │  password}               │
  │                              │                          │
  │                              │   Find User by Email/    │
  │                              │   Username               │
  │                              │                          │
  │                              │   Check if User Active   │
  │                              │                          │
  │                              │   Compare Passwords      │
  │                              │   (bcrypt comparison)    │
  │                              │                          │
  │                              │   Update lastLogin       │
  │                              │   Generate Tokens        │
  │                              │                          │
  │                              │<─ {user, accessToken,────│
  │                              │   refreshToken}         │
  │<────── Login Success ────────│                          │
  │ Tokens saved to localStorage │                          │
  │ Redirected to Home           │                          │
  │ AuthContext updated          │                          │
  │                              │                          │
```

---

## 🛡️ Protected Route Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  PROTECTED ROUTE FLOW                       │
└─────────────────────────────────────────────────────────────┘

USER                          FRONTEND                   BACKEND
  │                              │                          │
  │─ Access /wishlist ─────────>│                          │
  │                              │                          │
  │                              │ Check if Authenticated   │
  │                              │ (token in localStorage)  │
  │                              │                          │
  │                  IF NOT AUTHENTICATED:                  │
  │                              │ Redirect to /login       │
  │<─ Redirected to /login ─────│                          │
  │                              │                          │
  │                  IF AUTHENTICATED:                      │
  │<─ Show /wishlist ───────────│                          │
  │                              │                          │
  │─ Access Protected Endpoint ─>                           │
  │                              │                          │
  │                              │─GET /api/auth/me────────>│
  │                              │ Header: Bearer <token>   │
  │                              │                          │
  │                              │ Verify Token             │
  │                              │ (authMiddleware)         │
  │                              │                          │
  │                 IF TOKEN VALID:                         │
  │                              │ Get User from Database   │
  │                              │<─ {user}────────────────│
  │<────── User Data ───────────│                          │
  │                              │                          │
  │                 IF TOKEN INVALID/EXPIRED:               │
  │                              │ Return 401 Unauthorized  │
  │                              │<─ {error: "Invalid..."}─│
  │                              │                          │
  │ Use /refresh-token endpoint  │                          │
  │ to get new access token      │                          │
  │                              │                          │
```

---

## 🔄 Token Refresh Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 TOKEN REFRESH FLOW                          │
└─────────────────────────────────────────────────────────────┘

CLIENT (Frontend)               BACKEND
  │                              │
  │── Try API Call ────────────> │
  │ Header: Bearer <accessToken> │
  │                              │
  │                    Token Expired
  │                              │
  │<─── 401 Unauthorized ───────│
  │                              │
  │── POST /refresh-token ─────>│
  │ {refreshToken}               │
  │                              │
  │                    Verify refreshToken
  │                              │
  │<─── {newAccessToken} ───────│
  │                              │
  │── Retry API Call ──────────>│
  │ Header: Bearer <newAccessToken>
  │                              │
  │<─── 200 OK ────────────────│
  │ (Now with valid token)       │
  │                              │
```

---

## 📦 Password Hashing Flow

```
┌─────────────────────────────────────────────────────────────┐
│              PASSWORD HASHING & VERIFICATION                │
└─────────────────────────────────────────────────────────────┘

REGISTRATION:
User Password: "SecurePass123"
      │
      ├─ Generate Salt (10 rounds)
      │
      ├─ Hash Password with Salt
      │
      └─> Stored in DB: "$2a$10$..." (hashed)
           (Original never stored)

LOGIN:
User Password: "SecurePass123"
      │
      ├─ Retrieve Hashed Password from DB
      │
      ├─ Compare with bcrypt
      │
      ├─> Passwords Match ✅
      │   Generate Tokens
      │   Login Success
      │
      └─> Passwords Don't Match ❌
          Invalid Credentials Error
```

---

## 📧 Email OTP Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    EMAIL OTP FLOW                           │
└─────────────────────────────────────────────────────────────┘

STEP 1: Request OTP
  │
  ├─ User enters email
  ├─ System generates random 6-digit OTP
  ├─ Save to Database with 5-minute expiry
  ├─ Send via Nodemailer (Gmail SMTP)
  └─ User receives in email

STEP 2: Verify OTP
  │
  ├─ User enters 6-digit OTP
  ├─ System finds OTP record in Database
  ├─ Check if OTP matches
  ├─ Check if OTP not expired
  ├─ Delete OTP from Database
  ├─ Generate Tokens
  └─ User authenticated

NOTE:
  • OTP valid for 5 minutes
  • Auto-deleted from DB after expiry
  • Can request new OTP if expired
  • Rate-limited: max 1 OTP per email per minute
```

---

## 🔐 JWT Token Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    JWT TOKEN STRUCTURE                      │
└─────────────────────────────────────────────────────────────┘

HEADER:
{
  "alg": "HS256",
  "typ": "JWT"
}

PAYLOAD:
{
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "username": "johndoe",
  "iat": 1733385600,      // Issued at
  "exp": 1733990400       // Expiry (7 days)
}

SIGNATURE:
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  "your-jwt-secret"
)

RESULT:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE3MzMzODU2MDAsImV4cCI6MTczMzk5MDQwMH0.abc123...
```

---

## 📊 Authentication State Flow

```
┌─────────────────────────────────────────────────────────────┐
│               AUTHENTICATION STATE (REACT)                  │
└─────────────────────────────────────────────────────────────┘

App Loads
  │
  ├─ Check localStorage for token & user
  │
  ├─ If Found:
  │ ├─ Set token in state
  │ ├─ Set user in state
  │ └─ isAuthenticated = true ✅
  │
  └─ If Not Found:
    ├─ token = null
    ├─ user = null
    └─ isAuthenticated = false ❌

User Navigates to Page
  │
  ├─ If Protected Route:
  │ ├─ Check isAuthenticated
  │ ├─ If true: Show Component ✅
  │ └─ If false: Redirect to /login ❌
  │
  └─ If Public Route:
    └─ Show Component ✅

User Clicks Logout
  │
  ├─ Clear localStorage
  ├─ Clear state
  ├─ isAuthenticated = false
  └─ Redirect to home/login

User Logs In
  │
  ├─ Receive tokens from backend
  ├─ Save to localStorage
  ├─ Update state
  ├─ isAuthenticated = true
  ├─ Redirect to home
  └─ Can now access protected routes ✅
```

---

## 📝 API Request Examples

```
1. SEND OTP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/auth/register/send-otp
Content-Type: application/json

{
  "email": "john@example.com"
}

Response:
{
  "message": "OTP sent to email"
}

2. VERIFY OTP & REGISTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/auth/register/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "username": "johndoe",
  "fullName": "John Doe",
  "password": "SecurePass123"
}

Response:
{
  "message": "Registration successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "username": "johndoe",
    "fullName": "John Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

3. LOGIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/auth/login
Content-Type: application/json

{
  "emailOrUsername": "johndoe",
  "password": "SecurePass123"
}

Response:
{
  "message": "Login successful",
  "user": {...},
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

4. PROTECTED REQUEST (with valid token)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response:
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "username": "johndoe",
    "fullName": "John Doe",
    "phone": null,
    "isEmailVerified": true,
    "isActive": true,
    "lastLogin": "2025-12-05T15:30:00Z",
    "createdAt": "2025-12-05T10:00:00Z"
  }
}
```

---

**Created:** December 5, 2025
**Version:** 1.0
