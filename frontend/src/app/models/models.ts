export interface User {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  role: 'user' | 'admin';
}

export interface Booking {
  _id?: string;
  user?: string;
  turfType: string;
  date: Date;
  timeSlot: string;
  duration: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'success' | 'failed';
  createdAt?: Date;
}

export interface Payment {
  _id?: string;
  booking: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'success' | 'failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}
