# Shourya Turf & Sports Academy - Full Stack Application

A complete booking management system for sports turf facilities with OTP authentication and UPI payment integration.

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **Nodemailer** - Email OTP
- **Twilio** - SMS OTP
- **Razorpay** - UPI Payment Gateway

### Frontend
- **Angular 17** - Modern web framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **Razorpay Checkout** - Payment UI

## 📋 Features

### User Features
- ✅ OTP-based login (Email/Mobile)
- ✅ Browse available turf types (Cricket, Football, Badminton, Multi-purpose)
- ✅ Real-time slot availability
- ✅ Book turf with date and time selection
- ✅ Integrated UPI payment via Razorpay
- ✅ View booking history
- ✅ Payment confirmation

### Admin Features
- ✅ Dashboard with statistics
- ✅ View all bookings
- ✅ Update booking status
- ✅ Revenue reports
- ✅ Booking analytics by turf type

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn
- Razorpay account (for payments)
- Twilio account (for SMS OTP)
- Gmail account (for Email OTP)

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` file with your credentials:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shourya_turf
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

FRONTEND_URL=http://localhost:4200
```

4. **Start MongoDB:**
```bash
mongod
```

5. **Run the backend server:**
```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**

Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  razorpayKeyId: 'your_razorpay_key_id'
};
```

4. **Run the Angular app:**
```bash
npm start
```

Frontend will run on `http://localhost:4200`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email/mobile
- `POST /api/auth/verify-otp` - Verify OTP and login
- `GET /api/auth/me` - Get current user (Protected)

### Bookings
- `POST /api/bookings` - Create new booking (Protected)
- `GET /api/bookings/my-bookings` - Get user bookings (Protected)
- `GET /api/bookings/available-slots` - Get available time slots
- `GET /api/bookings/all` - Get all bookings (Admin)
- `PUT /api/bookings/:id/status` - Update booking status (Admin)

### Payments
- `POST /api/payments/create-order` - Create Razorpay order (Protected)
- `POST /api/payments/verify` - Verify payment signature (Protected)
- `GET /api/payments/history` - Get payment history (Protected)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics (Admin)
- `GET /api/admin/revenue-report` - Revenue report (Admin)
- `GET /api/admin/booking-report` - Booking analytics (Admin)

## 🔐 Creating Admin User

Connect to MongoDB and create an admin user:

```javascript
use shourya_turf

db.users.insertOne({
  name: "Admin",
  email: "shauryasports7@gmail.com",
  role: "admin",
  isVerified: true,
  createdAt: new Date()
})
```

Login with this email to access admin panel.

## 💳 Payment Integration

### Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get API Keys from Dashboard
3. Add keys to backend `.env` and frontend `environment.ts`
4. Test with Razorpay test cards:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

### UPI Testing
Use Razorpay test UPI IDs:
- `success@razorpay`
- `failure@razorpay`

## 📱 OTP Configuration

### Email OTP (Gmail)
1. Enable 2-factor authentication on Gmail
2. Generate App Password: Google Account → Security → App Passwords
3. Use app password in `EMAIL_PASS`

### SMS OTP (Twilio)
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get Account SID and Auth Token
3. Get a Twilio phone number
4. Add credentials to `.env`

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Prepare for deployment:**
```bash
# Ensure package.json has start script
"scripts": {
  "start": "node server.js"
}
```

2. **Deploy to Heroku:**
```bash
heroku create shourya-turf-api
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret
# Set all other environment variables
git push heroku main
```

3. **Or deploy to Render/Railway:**
- Connect GitHub repository
- Set environment variables in dashboard
- Deploy automatically

### Frontend Deployment (Vercel/Netlify)

1. **Build for production:**
```bash
npm run build:prod
```

2. **Deploy to Vercel:**
```bash
npm install -g vercel
vercel --prod
```

3. **Or deploy to Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist/shourya-turf-app
```

4. **Update environment:**
Edit `src/environments/environment.prod.ts` with production API URL.

### Database (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend environment

## 📊 Project Structure

```
shourya-turf-academy/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Booking.js
│   │   │   └── Payment.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── bookingController.js
│   │   │   ├── paymentController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── booking.js
│   │   │   ├── payment.js
│   │   │   └── admin.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── utils/
│   │       ├── otp.js
│   │       └── payment.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── booking/
│   │   │   │   └── admin/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── booking.service.ts
│   │   │   │   ├── payment.service.ts
│   │   │   │   └── admin.service.ts
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── models/
│   │   │   │   └── models.ts
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── environments/
│   │   ├── index.html
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🧪 Testing

### Test User Flow
1. Open `http://localhost:4200`
2. Register with email/mobile
3. Verify OTP
4. Create a booking
5. Complete payment
6. View booking in dashboard

### Test Admin Flow
1. Create admin user in MongoDB
2. Login with admin credentials
3. Access admin dashboard
4. View all bookings and reports
5. Update booking status

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version
# Start MongoDB service
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
# Kill process on port 4200
npx kill-port 4200
```

### CORS Issues
Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL.

### Payment Issues
- Verify Razorpay keys are correct
- Check browser console for errors
- Ensure Razorpay script is loaded in index.html

## 📈 Future Enhancements

- [ ] Email notifications for booking confirmation
- [ ] SMS reminders before booking time
- [ ] Multi-language support
- [ ] Mobile app (React Native/Flutter)
- [ ] Advanced analytics dashboard
- [ ] Loyalty points system
- [ ] Recurring bookings
- [ ] Equipment rental integration
- [ ] Weather-based cancellation policy
- [ ] Social media integration

## 📄 License

MIT License - feel free to use this project for your turf academy!

## 👥 Support

For issues and questions:
- Create an issue in the repository
- Email: support@shouryaturf.com

## 🎉 Acknowledgments

- Razorpay for payment gateway
- Twilio for SMS services
- MongoDB Atlas for database hosting
- Angular team for the amazing framework

---

**Built with ❤️ for Shourya Turf & Sports Academy**
