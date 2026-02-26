const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true, lowercase: true },
  mobile: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.generateOTP = function() {
  this.otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return this.otp;
};

userSchema.methods.verifyOTP = function(otp) {
  return this.otp === otp && this.otpExpiry > Date.now();
};

module.exports = mongoose.model('User', userSchema);
