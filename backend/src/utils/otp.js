const nodemailer = require('nodemailer');
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmailOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Shourya Turf - Login OTP',
      html: `<p>Your OTP is: <strong>${otp}</strong></p><p>Valid for 10 minutes.</p>`
    });
    return true;
  } catch (error) {
    console.error('Email OTP error:', error);
    return false;
  }
};

exports.sendSMSOTP = async (mobile, otp) => {
  try {
    await twilioClient.messages.create({
      body: `Your Shourya Turf OTP is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile
    });
    return true;
  } catch (error) {
    console.error('SMS OTP error:', error);
    return false;
  }
};
