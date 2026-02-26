const express = require('express');
const {
  getDashboardStats,
  getRevenueReport,
  getBookingReport
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/revenue-report', getRevenueReport);
router.get('/booking-report', getBookingReport);

module.exports = router;
