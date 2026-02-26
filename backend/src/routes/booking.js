const express = require('express');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  getAvailableSlots
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/available-slots', getAvailableSlots);
router.get('/all', protect, authorize('admin'), getAllBookings);
router.put('/:id/status', protect, authorize('admin'), updateBookingStatus);

module.exports = router;
