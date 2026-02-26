# API Documentation - Shourya Turf & Sports Academy

Base URL: `http://localhost:5000/api` (Development)

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. Send OTP
**POST** `/auth/send-otp`

Send OTP to user's email or mobile for authentication.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```
OR
```json
{
  "name": "John Doe",
  "mobile": "+919876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### 2. Verify OTP
**POST** `/auth/verify-otp`

Verify OTP and receive authentication token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 3. Get Current User
**GET** `/auth/me` 🔒

Get currently authenticated user details.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## Booking Endpoints

### 1. Create Booking
**POST** `/bookings` 🔒

Create a new turf booking.

**Request Body:**
```json
{
  "turfType": "cricket",
  "date": "2024-01-15",
  "timeSlot": "10:00-11:00",
  "duration": 2,
  "amount": 3000
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "turfType": "cricket",
    "date": "2024-01-15T00:00:00.000Z",
    "timeSlot": "10:00-11:00",
    "duration": 2,
    "amount": 3000,
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2024-01-10T10:30:00.000Z"
  }
}
```

### 2. Get My Bookings
**GET** `/bookings/my-bookings` 🔒

Get all bookings for the authenticated user.

**Response:**
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "turfType": "cricket",
      "date": "2024-01-15T00:00:00.000Z",
      "timeSlot": "10:00-11:00",
      "duration": 2,
      "amount": 3000,
      "status": "confirmed",
      "paymentStatus": "success",
      "createdAt": "2024-01-10T10:30:00.000Z"
    }
  ]
}
```

### 3. Get Available Slots
**GET** `/bookings/available-slots`

Get available time slots for a specific date and turf type.

**Query Parameters:**
- `date` (required): Date in YYYY-MM-DD format
- `turfType` (required): cricket | football | badminton | multi-purpose

**Example:**
```
GET /bookings/available-slots?date=2024-01-15&turfType=cricket
```

**Response:**
```json
{
  "success": true,
  "availableSlots": [
    "06:00-07:00",
    "07:00-08:00",
    "10:00-11:00",
    "15:00-16:00"
  ]
}
```

### 4. Get All Bookings (Admin)
**GET** `/bookings/all` 🔒👑

Get all bookings (admin only).

**Response:**
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "mobile": "+919876543210"
      },
      "turfType": "cricket",
      "date": "2024-01-15T00:00:00.000Z",
      "timeSlot": "10:00-11:00",
      "amount": 3000,
      "status": "confirmed",
      "paymentStatus": "success"
    }
  ]
}
```

### 5. Update Booking Status (Admin)
**PUT** `/bookings/:id/status` 🔒👑

Update booking status (admin only).

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "_id": "507f1f77bcf86cd799439011",
    "status": "confirmed"
  }
}
```

---

## Payment Endpoints

### 1. Create Payment Order
**POST** `/payments/create-order` 🔒

Create a Razorpay payment order.

**Request Body:**
```json
{
  "bookingId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "order_MNqwertyuiop123",
  "amount": 300000,
  "currency": "INR",
  "keyId": "rzp_test_1234567890"
}
```

### 2. Verify Payment
**POST** `/payments/verify` 🔒

Verify Razorpay payment signature.

**Request Body:**
```json
{
  "orderId": "order_MNqwertyuiop123",
  "paymentId": "pay_MNqwertyuiop456",
  "signature": "abc123def456...",
  "bookingId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

### 3. Get Payment History
**GET** `/payments/history` 🔒

Get payment history for authenticated user.

**Response:**
```json
{
  "success": true,
  "payments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "booking": {
        "turfType": "cricket",
        "date": "2024-01-15T00:00:00.000Z"
      },
      "amount": 3000,
      "paymentMethod": "upi",
      "status": "success",
      "razorpayPaymentId": "pay_MNqwertyuiop456",
      "createdAt": "2024-01-10T10:35:00.000Z"
    }
  ]
}
```

---

## Admin Endpoints

All admin endpoints require admin role.

### 1. Get Dashboard Stats
**GET** `/admin/dashboard` 🔒👑

Get dashboard statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalBookings": 150,
    "totalRevenue": 225000,
    "totalUsers": 75,
    "pendingBookings": 5
  }
}
```

### 2. Get Revenue Report
**GET** `/admin/revenue-report` 🔒👑

Get revenue report with optional date range.

**Query Parameters (Optional):**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Example:**
```
GET /admin/revenue-report?startDate=2024-01-01&endDate=2024-01-31
```

**Response:**
```json
{
  "success": true,
  "report": [
    {
      "_id": "2024-01-10",
      "revenue": 15000,
      "count": 10
    },
    {
      "_id": "2024-01-11",
      "revenue": 12000,
      "count": 8
    }
  ]
}
```

### 3. Get Booking Report
**GET** `/admin/booking-report` 🔒👑

Get booking analytics by turf type.

**Query Parameters (Optional):**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "report": [
    {
      "_id": "cricket",
      "count": 50,
      "revenue": 75000
    },
    {
      "_id": "football",
      "count": 40,
      "revenue": 48000
    },
    {
      "_id": "badminton",
      "count": 30,
      "revenue": 15000
    }
  ]
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Not authorized"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Access denied"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Data Models

### User
```typescript
{
  _id: ObjectId,
  name: string,
  email?: string,
  mobile?: string,
  role: 'user' | 'admin',
  isVerified: boolean,
  createdAt: Date
}
```

### Booking
```typescript
{
  _id: ObjectId,
  user: ObjectId,
  turfType: 'cricket' | 'football' | 'badminton' | 'multi-purpose',
  date: Date,
  timeSlot: string,
  duration: number,
  amount: number,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  paymentId?: string,
  paymentStatus: 'pending' | 'success' | 'failed',
  createdAt: Date
}
```

### Payment
```typescript
{
  _id: ObjectId,
  booking: ObjectId,
  user: ObjectId,
  amount: number,
  paymentMethod: 'upi' | 'card' | 'netbanking',
  razorpayOrderId?: string,
  razorpayPaymentId?: string,
  razorpaySignature?: string,
  status: 'pending' | 'success' | 'failed',
  createdAt: Date
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding rate limiting middleware.

## Pagination

Currently not implemented. All list endpoints return full results. Consider adding pagination for production.

---

**Legend:**
- 🔒 = Requires authentication
- 👑 = Requires admin role
