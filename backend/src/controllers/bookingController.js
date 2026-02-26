const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { turfType, date, timeSlot, duration, amount } = req.body;

    const existingBooking = await Booking.findOne({
      turfType,
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Slot already booked' });
    }

    // Don't create booking yet, just return booking data for payment
    res.status(200).json({ 
      success: true, 
      bookingData: {
        user: req.user._id,
        turfType,
        date,
        timeSlot,
        duration,
        amount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email mobile').sort('-createdAt');
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date, turfType } = req.query;
    const slots = ['06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', 
                   '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00',
                   '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00'];

    const bookedSlots = await Booking.find({
      date: new Date(date),
      turfType,
      status: { $in: ['pending', 'confirmed'] }
    }).select('timeSlot');

    const booked = bookedSlots.map(b => b.timeSlot);
    const available = slots.filter(slot => !booked.includes(slot));

    res.json({ success: true, availableSlots: available });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
