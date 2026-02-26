const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalUsers = await User.countDocuments({ role: 'user' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });

    res.json({
      success: true,
      stats: {
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalUsers,
        pendingBookings
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const match = { status: 'success' };
    if (startDate && endDate) {
      match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const report = await Payment.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookingReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const match = {};
    if (startDate && endDate) {
      match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const report = await Booking.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$turfType',
          count: { $sum: 1 },
          revenue: { $sum: '$amount' }
        }
      }
    ]);

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
