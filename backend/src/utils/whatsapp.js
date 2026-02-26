const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendPaymentFailedAlert = async (bookingDetails, userDetails) => {
  try {
    const message = `🚨 *Payment Failed Alert*\n\n` +
      `*User Details:*\n` +
      `Name: ${userDetails.name}\n` +
      `Mobile: ${userDetails.mobile || userDetails.email}\n\n` +
      `*Booking Details:*\n` +
      `Turf Type: ${bookingDetails.turfType}\n` +
      `Date: ${new Date(bookingDetails.date).toLocaleDateString()}\n` +
      `Time Slot: ${bookingDetails.timeSlot}\n` +
      `Duration: ${bookingDetails.duration} hour(s)\n` +
      `Amount: ₹${bookingDetails.amount}\n\n` +
      `Time: ${new Date().toLocaleString()}`;

    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.ADMIN_WHATSAPP_NUMBER,
      body: message
    });

    console.log('WhatsApp alert sent to admin');
    return true;
  } catch (error) {
    console.error('WhatsApp alert error:', error);
    return false;
  }
};
