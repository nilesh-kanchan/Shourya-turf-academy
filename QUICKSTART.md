# Quick Start Guide - Shourya Turf & Sports Academy

Get your application running in 5 minutes!

## Prerequisites Check

```bash
node --version  # Should be v18+
npm --version   # Should be v9+
mongod --version # Should be v6+
```

## Step 1: Clone/Download Project

```bash
cd d:\Projects\shourya-turf-academy
```

## Step 2: Setup Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your credentials (use notepad or any editor)
notepad .env
```

**Minimum required in .env:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shourya_turf
JWT_SECRET=my_super_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:4200

# For testing, you can skip email/SMS OTP initially
# Payment testing requires Razorpay test keys (free signup)
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
```

## Step 3: Start MongoDB

```bash
# Windows
mongod

# Or if installed as service
net start MongoDB
```

## Step 4: Start Backend Server

```bash
# From backend directory
npm start
```

You should see:
```
MongoDB Connected
Server running on port 5000
```

## Step 5: Setup Frontend (2 minutes)

Open a NEW terminal:

```bash
# Navigate to frontend
cd d:\Projects\shourya-turf-academy\frontend

# Install dependencies
npm install

# Update environment (optional for local testing)
# Edit src/environments/environment.ts if needed
```

## Step 6: Start Frontend

```bash
# From frontend directory
npm start
```

You should see:
```
** Angular Live Development Server is listening on localhost:4200 **
```

## Step 7: Access Application

Open browser and go to: **http://localhost:4200**

## Step 8: Create Test Admin User

Open MongoDB shell:

```bash
mongosh
```

Run:
```javascript
use shourya_turf

db.users.insertOne({
  name: "Admin User",
  email: "admin@test.com",
  role: "admin",
  isVerified: true,
  createdAt: new Date()
})
```

## Testing the Application

### Test User Flow (Without OTP - Development Mode)

Since OTP requires email/SMS setup, for quick testing:

1. **Temporarily disable OTP verification** (development only):

Edit `backend/src/controllers/authController.js`:

```javascript
// In verifyOTP function, temporarily replace:
if (!user || !user.verifyOTP(otp)) {
  return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
}

// With (for testing only):
if (!user) {
  return res.status(400).json({ success: false, message: 'User not found' });
}
// This accepts any OTP for testing
```

2. **Test the flow:**
   - Go to http://localhost:4200
   - Enter name and email
   - Click "Send OTP"
   - Enter any 6-digit number (e.g., 123456)
   - Click "Verify OTP"
   - You should be logged in!

3. **Create a booking:**
   - Click "New Booking"
   - Select turf type, date, and time slot
   - Click "Book & Pay"

### Test Admin Flow

1. Login with admin@test.com (use any OTP if testing mode enabled)
2. You'll be redirected to admin dashboard
3. View statistics and manage bookings

## Razorpay Test Setup (For Payment Testing)

1. Sign up at https://razorpay.com/ (free)
2. Go to Settings → API Keys
3. Copy Test Key ID and Secret
4. Add to backend `.env`:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```
5. Add Key ID to frontend `src/environments/environment.ts`:
   ```typescript
   razorpayKeyId: 'rzp_test_xxxxx'
   ```
6. Restart both servers

**Test Payment:**
- Use test card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## Common Issues & Solutions

### Issue: MongoDB connection failed
**Solution:**
```bash
# Start MongoDB service
net start MongoDB

# Or run mongod in a separate terminal
mongod
```

### Issue: Port 5000 already in use
**Solution:**
```bash
# Kill the process
npx kill-port 5000

# Or change port in backend/.env
PORT=5001
```

### Issue: Port 4200 already in use
**Solution:**
```bash
# Kill the process
npx kill-port 4200

# Or run on different port
ng serve --port 4201
```

### Issue: Angular CLI not found
**Solution:**
```bash
npm install -g @angular/cli
```

### Issue: Cannot find module errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Project Structure Overview

```
shourya-turf-academy/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── models/      # MongoDB models
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API routes
│   │   └── utils/       # Helper functions
│   └── server.js        # Entry point
│
├── frontend/            # Angular application
│   └── src/
│       └── app/
│           ├── components/  # UI components
│           ├── services/    # API services
│           └── guards/      # Route guards
│
└── README.md           # Full documentation
```

## Next Steps

1. ✅ Application running locally
2. 📧 Setup email OTP (see README.md)
3. 📱 Setup SMS OTP (see README.md)
4. 💳 Configure Razorpay for payments
5. 🚀 Deploy to production (see DEPLOYMENT.md)

## Development Workflow

```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd backend
npm run dev  # Auto-reload on changes

# Terminal 3: Frontend
cd frontend
npm start    # Auto-reload on changes
```

## Useful Commands

```bash
# Backend
npm start          # Start server
npm run dev        # Start with nodemon (auto-reload)

# Frontend
npm start          # Start dev server
npm run build      # Build for production
npm run build:prod # Build with production config

# Database
mongosh                    # Open MongoDB shell
use shourya_turf          # Switch to database
db.users.find()           # View all users
db.bookings.find()        # View all bookings
```

## Getting Help

- 📖 Full documentation: `README.md`
- 🚀 Deployment guide: `DEPLOYMENT.md`
- 📡 API reference: `API_DOCUMENTATION.md`
- 🐛 Issues: Create an issue in the repository

## Production Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Setup email service (Gmail/SendGrid)
- [ ] Setup SMS service (Twilio)
- [ ] Get Razorpay production keys
- [ ] Setup MongoDB Atlas
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Remove OTP bypass code
- [ ] Test all features thoroughly

---

**You're all set! 🎉**

Start building your turf booking empire!
