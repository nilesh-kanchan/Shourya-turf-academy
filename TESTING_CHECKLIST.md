# Installation & Testing Checklist

## Pre-Installation Checklist

### System Requirements
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v9+ installed (`npm --version`)
- [ ] MongoDB v6+ installed (`mongod --version`)
- [ ] Git installed (optional, for version control)
- [ ] Code editor installed (VS Code recommended)

### Account Setup
- [ ] Razorpay account created (https://razorpay.com)
- [ ] Razorpay test keys obtained
- [ ] Gmail account for email OTP (optional for testing)
- [ ] Gmail app password generated (optional for testing)
- [ ] Twilio account created (optional for SMS testing)

## Installation Steps

### Step 1: Backend Setup
- [ ] Navigate to `backend` directory
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Update `.env` with your credentials
- [ ] Verify MongoDB is running
- [ ] Start backend server (`npm start`)
- [ ] Verify server is running on port 5000
- [ ] Test health endpoint: http://localhost:5000/api/health

### Step 2: Frontend Setup
- [ ] Navigate to `frontend` directory
- [ ] Run `npm install`
- [ ] Update `src/environments/environment.ts` with Razorpay key
- [ ] Start frontend server (`npm start`)
- [ ] Verify app is running on port 4200
- [ ] Open browser to http://localhost:4200

### Step 3: Database Setup
- [ ] MongoDB service is running
- [ ] Database `shourya_turf` is created automatically
- [ ] Create admin user in MongoDB (see QUICKSTART.md)
- [ ] Verify collections are created after first use

## Testing Checklist

### 1. Authentication Testing

#### User Registration (Email)
- [ ] Open http://localhost:4200
- [ ] Select "Email" option
- [ ] Enter name and email
- [ ] Click "Send OTP"
- [ ] Check email for OTP (or check backend logs)
- [ ] Enter OTP
- [ ] Click "Verify OTP"
- [ ] Verify successful login
- [ ] Verify redirect to dashboard

#### User Registration (Mobile)
- [ ] Click logout
- [ ] Select "Mobile" option
- [ ] Enter name and mobile number
- [ ] Click "Send OTP"
- [ ] Check SMS for OTP (or check backend logs)
- [ ] Enter OTP
- [ ] Click "Verify OTP"
- [ ] Verify successful login

#### Admin Login
- [ ] Logout from user account
- [ ] Login with admin email
- [ ] Verify redirect to admin dashboard
- [ ] Verify admin features are visible

### 2. Booking Flow Testing

#### Check Available Slots
- [ ] Login as regular user
- [ ] Click "New Booking"
- [ ] Select turf type (e.g., Cricket)
- [ ] Select today's date or future date
- [ ] Verify available slots are displayed
- [ ] Verify booked slots are not shown

#### Create Booking
- [ ] Select turf type
- [ ] Select date
- [ ] Select time slot
- [ ] Select duration (1-4 hours)
- [ ] Verify price calculation is correct
- [ ] Click "Book & Pay"
- [ ] Verify booking is created

### 3. Payment Testing

#### Razorpay Integration
- [ ] After creating booking, Razorpay popup appears
- [ ] Verify correct amount is shown
- [ ] Use test card: 4111 1111 1111 1111
- [ ] Enter any CVV (e.g., 123)
- [ ] Enter any future expiry date
- [ ] Complete payment
- [ ] Verify payment success message
- [ ] Verify redirect to dashboard

#### Payment Verification
- [ ] Check booking status changed to "confirmed"
- [ ] Check payment status changed to "success"
- [ ] Verify payment ID is recorded
- [ ] Check payment in payment history

#### UPI Testing (Optional)
- [ ] Create another booking
- [ ] Select UPI payment method
- [ ] Use test UPI: success@razorpay
- [ ] Complete payment
- [ ] Verify success

### 4. User Dashboard Testing

#### View Bookings
- [ ] Navigate to dashboard
- [ ] Verify all bookings are displayed
- [ ] Verify booking details are correct
- [ ] Verify status badges are color-coded
- [ ] Verify payment status is shown

#### Booking Details
- [ ] Check turf type is displayed
- [ ] Check date is formatted correctly
- [ ] Check time slot is shown
- [ ] Check duration is correct
- [ ] Check amount is correct

### 5. Admin Dashboard Testing

#### Dashboard Statistics
- [ ] Login as admin
- [ ] Verify total bookings count
- [ ] Verify total revenue amount
- [ ] Verify total users count
- [ ] Verify pending bookings count

#### View All Bookings
- [ ] Verify all bookings from all users are shown
- [ ] Verify user details are displayed
- [ ] Verify booking details are complete
- [ ] Verify table is sortable/readable

#### Update Booking Status
- [ ] Select a booking
- [ ] Change status from dropdown
- [ ] Verify status updates immediately
- [ ] Verify status change is saved
- [ ] Refresh page and verify status persists

#### Reports
- [ ] View booking report by turf type
- [ ] Verify counts are correct
- [ ] Verify revenue totals are correct
- [ ] Check revenue report (if data available)

### 6. Edge Cases & Error Handling

#### Duplicate Booking Prevention
- [ ] Try to book same slot twice
- [ ] Verify error message appears
- [ ] Verify booking is not created

#### Invalid OTP
- [ ] Try to login with wrong OTP
- [ ] Verify error message appears
- [ ] Verify login fails

#### Expired OTP
- [ ] Request OTP
- [ ] Wait 11 minutes
- [ ] Try to verify OTP
- [ ] Verify expiry error message

#### Unauthorized Access
- [ ] Logout
- [ ] Try to access /dashboard directly
- [ ] Verify redirect to login
- [ ] Try to access /admin as regular user
- [ ] Verify access denied

#### Payment Failure
- [ ] Create booking
- [ ] Close Razorpay popup without paying
- [ ] Verify booking remains in pending status
- [ ] Verify payment status is pending

### 7. UI/UX Testing

#### Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] Verify all elements are visible
- [ ] Verify buttons are clickable

#### Loading States
- [ ] Verify loading indicators appear
- [ ] Verify buttons disable during loading
- [ ] Verify loading text is shown

#### Error Messages
- [ ] Verify error messages are clear
- [ ] Verify error styling is visible
- [ ] Verify errors disappear after correction

#### Navigation
- [ ] Test all navigation links
- [ ] Verify back button works
- [ ] Verify logout works from all pages

### 8. API Testing (Optional)

#### Using Postman/Thunder Client
- [ ] Test POST /api/auth/send-otp
- [ ] Test POST /api/auth/verify-otp
- [ ] Test GET /api/auth/me (with token)
- [ ] Test GET /api/bookings/available-slots
- [ ] Test POST /api/bookings (with token)
- [ ] Test GET /api/bookings/my-bookings (with token)
- [ ] Test POST /api/payments/create-order (with token)
- [ ] Test GET /api/admin/dashboard (with admin token)

### 9. Database Verification

#### MongoDB Checks
- [ ] Connect to MongoDB
- [ ] Verify `users` collection exists
- [ ] Verify `bookings` collection exists
- [ ] Verify `payments` collection exists
- [ ] Check user documents are created
- [ ] Check booking documents are created
- [ ] Check payment documents are created
- [ ] Verify indexes are created

#### Data Integrity
- [ ] Verify user references in bookings
- [ ] Verify booking references in payments
- [ ] Verify no orphaned records
- [ ] Verify timestamps are correct

### 10. Performance Testing

#### Load Time
- [ ] Measure initial page load time (< 3 seconds)
- [ ] Measure API response time (< 500ms)
- [ ] Measure booking creation time (< 2 seconds)
- [ ] Measure payment processing time (< 3 seconds)

#### Concurrent Users (Optional)
- [ ] Test with 2-3 simultaneous bookings
- [ ] Verify no conflicts
- [ ] Verify all bookings are processed

## Post-Testing Checklist

### Code Quality
- [ ] No console errors in browser
- [ ] No console errors in backend logs
- [ ] No TypeScript errors
- [ ] No linting errors (if configured)

### Security
- [ ] JWT tokens are working
- [ ] Protected routes are secure
- [ ] Admin routes require admin role
- [ ] Passwords/secrets are in .env
- [ ] .env is in .gitignore

### Documentation
- [ ] README.md is complete
- [ ] API documentation is accurate
- [ ] Environment variables are documented
- [ ] Setup instructions are clear

## Production Readiness Checklist

### Before Deployment
- [ ] All tests passing
- [ ] No hardcoded credentials
- [ ] Environment variables configured
- [ ] MongoDB Atlas setup complete
- [ ] Razorpay production keys obtained
- [ ] Email service configured
- [ ] SMS service configured
- [ ] CORS configured for production URL
- [ ] Frontend environment.prod.ts updated
- [ ] SSL/HTTPS enabled
- [ ] Error logging configured
- [ ] Backup strategy in place

### Deployment Verification
- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Database connected
- [ ] API endpoints accessible
- [ ] Frontend can reach backend
- [ ] Payment gateway working
- [ ] OTP sending working
- [ ] Admin panel accessible
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### Post-Deployment Testing
- [ ] Test complete user flow on production
- [ ] Test admin flow on production
- [ ] Test payment on production (small amount)
- [ ] Verify email notifications
- [ ] Verify SMS notifications
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Test from different devices
- [ ] Test from different networks

## Issue Tracking

### Common Issues & Solutions

| Issue | Solution | Checked |
|-------|----------|---------|
| MongoDB not connecting | Start MongoDB service | [ ] |
| Port already in use | Kill process or change port | [ ] |
| OTP not sending | Check email/SMS credentials | [ ] |
| Payment not working | Verify Razorpay keys | [ ] |
| CORS error | Update FRONTEND_URL in backend | [ ] |
| 401 Unauthorized | Check JWT token in headers | [ ] |
| Build errors | Delete node_modules, reinstall | [ ] |

## Sign-Off

### Development Team
- [ ] Backend tested and working
- [ ] Frontend tested and working
- [ ] Database tested and working
- [ ] Integration tested and working
- [ ] Documentation complete

### QA Team (if applicable)
- [ ] All test cases passed
- [ ] No critical bugs found
- [ ] Performance acceptable
- [ ] Security verified

### Deployment Team (if applicable)
- [ ] Deployed to staging
- [ ] Staging tests passed
- [ ] Deployed to production
- [ ] Production tests passed
- [ ] Monitoring configured

---

## Testing Summary

**Total Test Cases:** ~80+

**Categories:**
- Authentication: 10 tests
- Booking: 15 tests
- Payment: 10 tests
- Admin: 10 tests
- UI/UX: 15 tests
- API: 8 tests
- Database: 8 tests
- Security: 5 tests

**Status:** [ ] All Passed  [ ] Issues Found  [ ] In Progress

**Tested By:** ________________

**Date:** ________________

**Notes:**
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

**Ready for Production:** [ ] YES  [ ] NO

**If NO, blockers:**
_____________________________________________________________
_____________________________________________________________
