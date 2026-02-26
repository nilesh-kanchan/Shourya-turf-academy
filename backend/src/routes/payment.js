const express = require('express');
const {
  createPaymentOrder,
  verifyPaymentSignature,
  getPaymentHistory
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order', protect, createPaymentOrder);
router.post('/verify', protect, verifyPaymentSignature);
router.get('/history', protect, getPaymentHistory);

module.exports = router;
