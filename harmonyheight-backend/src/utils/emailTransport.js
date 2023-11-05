// emailTransport.js
const nodemailer = require('nodemailer');

// Function to send the email
const sendEmail = async (userEmail, subject, htmlBody) => {
  const message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject,
    html: htmlBody,
  };

  const transportConfig = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  try {
    const transport = nodemailer.createTransport(transportConfig);
    await transport.sendMail(message);
    return true;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return false;
  }
};

module.exports = { sendEmail };
