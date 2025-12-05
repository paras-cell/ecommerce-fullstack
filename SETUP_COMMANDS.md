# 🔧 Setup Commands & Troubleshooting Guide

## 🚀 Installation Commands

### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

**This installs:**
- bcryptjs (password hashing)
- All other dependencies (express, mongoose, etc.)

### Step 2: Configure Environment Variables
```bash
# Copy example to .env
cp .env.example .env

# Edit .env with your values:
# MONGO_URI=mongodb://localhost:27017/ecommerce
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password
# JWT_SECRET=random-secret-key
```

### Step 3: Start Backend
```bash
npm start
# Output: Server running on port 5000
# Output: MongoDB connected
```

### Step 4: Start Frontend (in new terminal)
```bash
cd frontend
npm run dev
# Output: Local: http://localhost:5173
```

### Step 5: Open in Browser
```
http://localhost:5173
```

---

## 🧪 Quick Test Commands

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"emailOrUsername":"username","password":"Password123"}'
```

### Test Protected Route
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🐛 Troubleshooting Guide

### Issue: "Cannot find module 'bcryptjs'"

**Solution:**
```bash
cd server
npm install bcryptjs
```

### Issue: "MongoDB connection error"

**Check:**
```bash
# 1. Is MongoDB running?
# Windows: mongod (in admin terminal)
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# 2. Is connection string correct?
echo %MONGO_URI%  # Windows
echo $MONGO_URI   # Mac/Linux

# 3. Can you connect manually?
mongosh mongodb://localhost:27017
```

### Issue: "Gmail not sending OTP"

**Check:**
```bash
# 1. Is EMAIL_USER set correctly?
echo %EMAIL_USER%

# 2. Is EMAIL_PASS an App Password?
# Not your regular Gmail password!
# Get it from: myaccount.google.com/apppasswords

# 3. Test sending email:
# Try in Node terminal:
node
require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'test@example.com',
  subject: 'Test',
  text: 'Test'
}, (err) => console.log(err ? 'Error: ' + err : 'Sent!'));
```

### Issue: "CORS error"

**Check:**
```javascript
// In server.js - make sure frontend URL is in CORS
cors({
  origin: [
    'http://localhost:5173',  // Add your frontend URL
    'https://your-domain.com'
  ],
  credentials: true
})
```

### Issue: "Token expired"

**Solution:**
```javascript
// Use refresh token to get new access token
const response = await fetch('http://localhost:5000/api/auth/refresh-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
});
```

### Issue: "localStorage.getItem('token') is null"

**Check:**
```javascript
// In browser console:
localStorage.getItem('token')        // Should have token
localStorage.getItem('refreshToken') // Should have refresh token
localStorage.getItem('user')         // Should have user object

// If null:
// 1. Did you log in?
// 2. Did login complete successfully?
// 3. Check network tab for errors
```

### Issue: "Cannot verify OTP"

**Check:**
```bash
# 1. Is OTP exactly 6 digits?
# 2. Is OTP still valid? (expires in 5 minutes)
# 3. Is email correct?
# 4. Check MongoDB:
mongosh
use ecommerce
db.otps.find()  # Should see your OTP record
```

### Issue: "Email already registered"

**Solution:**
```bash
# 1. Use different email for testing
# 2. Or delete user from database:
mongosh
use ecommerce
db.users.deleteOne({email: "old@example.com"})

# 3. Clear browser storage:
localStorage.clear()
```

---

## 📝 Useful Commands

### Database
```bash
# Start MongoDB
mongod

# Connect to MongoDB
mongosh mongodb://localhost:27017

# Connect to ecommerce database
use ecommerce

# View all users
db.users.find()

# View all OTPs
db.otps.find()

# Delete a user
db.users.deleteOne({email: "test@example.com"})

# Clear all users
db.users.deleteMany({})
```

### Server
```bash
# Start server
cd server
npm start

# Start with nodemon (auto-restart on changes)
npm install -g nodemon
nodemon server.js

# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5000 (Mac/Linux)
lsof -i :5000
kill -9 <PID>
```

### Frontend
```bash
# Start development server
cd frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Browser DevTools Tips

### Check LocalStorage
```javascript
// In browser console:
// View all auth data
console.log(JSON.parse(localStorage.getItem('user')))
console.log(localStorage.getItem('token'))
console.log(localStorage.getItem('refreshToken'))

// Clear auth data
localStorage.removeItem('token')
localStorage.removeItem('refreshToken')
localStorage.removeItem('user')

// Or clear everything
localStorage.clear()
```

### Decode JWT Token
```javascript
// In browser console:
const token = localStorage.getItem('token');
const parts = token.split('.');
const payload = JSON.parse(atob(parts[1]));
console.log(payload);

// Output should show: userId, email, username, iat, exp
```

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Do login action
4. Click on request
5. View:
   - Request headers
   - Request body
   - Response headers
   - Response body

### Check Console for Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Check error messages
5. Check network errors

---

## 📊 API Testing with cURL

### Send OTP
```bash
curl -X POST http://localhost:5000/api/auth/register/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'

# Response:
# {"message":"OTP sent to email"}
```

### Verify OTP & Register
```bash
curl -X POST http://localhost:5000/api/auth/register/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "otp":"123456",
    "username":"johndoe",
    "fullName":"John Doe",
    "password":"SecurePass123"
  }'

# Response:
# {
#   "message": "Registration successful",
#   "user": {...},
#   "accessToken": "...",
#   "refreshToken": "..."
# }
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername":"johndoe",
    "password":"SecurePass123"
  }'

# Response:
# {
#   "message": "Login successful",
#   "user": {...},
#   "accessToken": "...",
#   "refreshToken": "..."
# }
```

### Get User Profile
```bash
# Replace TOKEN with your access token
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"

# Response:
# {"user": {...}}
```

---

## 📱 Testing on Different Browsers

### Chrome/Chromium
```bash
# Clear cache and cookies
Settings → Privacy → Clear browsing data
# Or: Ctrl+Shift+Delete

# Open DevTools: F12 or Right-click → Inspect
```

### Firefox
```bash
# Clear storage
Right-click → Inspect → Storage → Local Storage → Delete All

# Open DevTools: F12 or Ctrl+Shift+I
```

### Safari
```bash
# Enable Developer Menu
Safari → Preferences → Advanced → Show features for web developers

# Open DevTools: Cmd+Option+I
```

---

## 🔒 Security Checklist Before Deployment

- [ ] Change JWT_SECRET to strong random value
- [ ] Change EMAIL_USER and EMAIL_PASS
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Add HTTPS URL to CORS
- [ ] Add rate limiting
- [ ] Enable password reset
- [ ] Enable 2FA (optional)
- [ ] Test all edge cases
- [ ] Run security audit
- [ ] Test on real database
- [ ] Test email delivery
- [ ] Test from different IPs
- [ ] Monitor error logs

---

## 📞 Emergency Reset

### If Everything Breaks:

**Backend:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
# Check .env file
npm start
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Database:**
```bash
mongosh
use ecommerce
db.users.deleteMany({})
db.otps.deleteMany({})
```

**Browser:**
```javascript
// Console:
localStorage.clear()
location.reload()
```

---

## 🎯 Pre-Production Checklist

### Code Quality
- [ ] No console.log() in production
- [ ] All error messages user-friendly
- [ ] Input validation everywhere
- [ ] No hardcoded secrets
- [ ] No debugging code

### Performance
- [ ] Database queries optimized
- [ ] No N+1 queries
- [ ] Pagination implemented
- [ ] Caching where applicable
- [ ] Images optimized

### Security
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevented
- [ ] XSS prevented
- [ ] Passwords hashed
- [ ] Tokens signed
- [ ] Secrets in env vars

### Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests passing
- [ ] Manual testing complete
- [ ] Cross-browser testing done
- [ ] Mobile testing done

### Monitoring
- [ ] Error logging setup
- [ ] Performance monitoring setup
- [ ] Uptime monitoring setup
- [ ] Alert notifications setup
- [ ] Database backups setup

---

## 🎓 Learning Resources

- [JWT Tutorial](https://jwt.io/introduction)
- [bcryptjs Docs](https://github.com/dcodeIO/bcrypt.js)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [React Security](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [OWASP Top 10](https://owasp.org/Top10/)

---

**Last Updated:** December 5, 2025
**Version:** 1.0
