const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // Gmail or other email service
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_APP_PASSWORD, // App-specific password
  },
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `MD Care App <${process.env.EMAIL_USERNAME}>`, // Sender email
      to: options.email, // Receiver email
      subject: options.subject, // Subject line
      text: options.message, // Plain text body
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Could not send email.');
  }
};

module.exports = sendEmail;
