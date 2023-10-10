// controllers/CustomerController.js
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateVerificationCode } = require('../utils/utils');
const { sendVerificationCodeEmail } = require('../utils/nodeMailerUtils');
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ errors: 'Unauthorized access' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, customer.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ errors: 'Unauthorized access' });
    }
    if (!customer.isEmailVerified) {
      const verificationCode = generateVerificationCode();
      customer.verificationCode = verificationCode;
      await customer.save();
      let responseMail = await sendVerificationCodeEmail(
        customer.email,
        customer.verificationCode,
        customer.name,
      );
      if (responseMail) {
        return res.status(200).json({
          message: 'Email verificationCode has been sent to your email.',
          user: { ...customer._doc },
        });
      } else {
        return res
          .status(500)
          .json({ errors: 'Email verification code sending failed.' });
      }
    }

    const token = jwt.sign(
      {
        customerId: customer._id,
        email: customer.email,
      },
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: '1d',
      },
    );
    delete customer._doc.password;
    delete customer._doc.verificationCode;
    res
      .status(200)
      .json({ message: 'Login successful', token, user: customer._doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: 'Internal Server Error' });
  }
};

exports.register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const verificationCode = generateVerificationCode();
    const newCustomer = new Customer({
      email,
      password,
      name,
      verificationCode,
    });
    const savedCustomer = await newCustomer.save();
    delete savedCustomer._doc.password;
    delete savedCustomer._doc.verificationCode;
    let responseMail = await sendVerificationCodeEmail(
      email,
      verificationCode,
      name,
    );
    if (responseMail) {
      return res.status(200).json({
        message: 'Email verificationCode has been sent to your email.',
        user: { ...savedCustomer._doc },
      });
    } else {
      return res
        .status(500)
        .json({ errors: 'Email verification code sending failed.' });
    }
  } catch (error) {
    const validationError = JSON.parse(error.message);
    res.status(422).json({ errors: validationError });
  }
};
// /verify/:email/:code
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await Customer.findOne({ email, verificationCode: code });

    if (!user) {
      return res.status(400).json({ errors: 'Invalid verification code' });
    }

    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ errors: 'Error verifying email' });
  }
};
