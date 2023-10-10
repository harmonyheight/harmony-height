const { sendEmail } = require('./emailTransport');
const {
  generateVerificationCodeEmail,
} = require('./mailgen/verifyEmailTemplate');
const sendVerificationCodeEmail = async (userEmail, code, name) => {
  const subject = 'Email Verification Code';
  const htmlBody = generateVerificationCodeEmail(code, name);

  try {
    await sendEmail(userEmail, subject, htmlBody);
    console.log('Email sent successfully.');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
module.exports = { sendVerificationCodeEmail };
