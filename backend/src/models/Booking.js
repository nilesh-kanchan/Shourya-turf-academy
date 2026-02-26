const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  turfType: { type: String, required: true, enum: ['cricket', 'football', 'badminton', 'multi-purpose'] },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  duration: { type: Number, required: true, default: 1 },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  paymentId: { type: String },
  paymentStatus: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

bookingSchema.index({ date: 1, timeSlot: 1, turfType: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
