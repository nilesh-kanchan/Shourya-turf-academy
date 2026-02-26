const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { createOrder, verifyPayment } = require('../utils/payment');
const { sendPaymentFailedAlert } = require('../utils/whatsapp');

exports.createPaymentOrder = async (req, res) => {
  try {
    const { bookingData } = req.body;

    // Check slot availability again before creating order
    const existingBooking = await Booking.findOne({
      turfType: bookingData.turfType,
      date: new Date(bookingData.date),
      timeSlot: bookingData.timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Slot no longer available' });
    }

    const order = await createOrder(bookingData.amount, `booking_${Date.now()}`);

    const payment = await Payment.create({
      booking: null,
      user: req.user._id,
      amount: bookingData.amount,
      razorpayOrderId: order.id
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      bookingData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPaymentSignature = async (req, res) => {
  try {
    const { orderId, paymentId, signature, bookingData } = req.body;

    const isValid = verifyPayment(orderId, paymentId, signature);

    if (!isValid) {
      if (bookingData) {
        await sendPaymentFailedAlert(
          {
            turfType: bookingData.turfType,
            date: bookingData.date,
            timeSlot: bookingData.timeSlot,
            duration: bookingData.duration,
            amount: bookingData.amount
          },
          {
            name: req.user.name,
            mobile: req.user.mobile,
            email: req.user.email
          }
        );
      }
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Create booking only after successful payment
    const booking = await Booking.create({
      user: bookingData.user,
      turfType: bookingData.turfType,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      duration: bookingData.duration,
      amount: bookingData.amount,
      paymentId,
      paymentStatus: 'success',
      status: 'confirmed'
    });

    await Payment.findOneAndUpdate(
      { razorpayOrderId: orderId },
      { 
        razorpayPaymentId: paymentId, 
        razorpaySignature: signature, 
        status: 'success',
        booking: booking._id
      }
    );

    res.json({ success: true, message: 'Payment verified and booking confirmed', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('booking')
      .sort('-createdAt');
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
