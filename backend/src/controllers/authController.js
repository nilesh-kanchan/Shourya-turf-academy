const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmailOTP, sendSMSOTP } = require('../utils/otp');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

exports.sendOTP = async (req, res) => {
  try {
    const { email, mobile, name } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({ success: false, message: 'Email or mobile required' });
    }

    const query = email ? { email } : { mobile };
    let user = await User.findOne(query);

    if (!user) {
      user = new User({ name, email, mobile });
    } else {
      user.name = name;
    }

    const otp = user.generateOTP();
    await user.save();

    if (email) {
      await sendEmailOTP(email, otp);
    } else {
      await sendSMSOTP(mobile, otp);
    }

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, mobile, otp } = req.body;

    const user = await User.findOne(email ? { email } : { mobile });

    if (!user || !user.verifyOTP(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({
    success: true,
    user: { id: req.user._id, name: req.user.name, email: req.user.email, mobile: req.user.mobile, role: req.user.role }
  });
};
