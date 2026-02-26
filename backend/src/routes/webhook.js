const express = require('express');
const Booking = require('../models/Booking');
const { sendPaymentFailedAlert } = require('../utils/whatsapp');

const router = express.Router();

router.post('/payment-failed', async (req, res) => {
  try {
    const { bookingData } = req.body;
    
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
          name: bookingData.user?.name || 'Unknown',
          mobile: bookingData.user?.mobile || 'N/A',
          email: bookingData.user?.email || 'N/A'
        }
      );
    }
    
    res.json({ success: true, message: 'Alert sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
