// controllers/CustomerController.js
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateVerificationCode, decrypt } = require('../utils/utils');
const { sendVerificationCodeEmail } = require('../utils/nodeMailerUtils');
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: 'User account not found' });
    }
    const decryptedPassword = decrypt(password);
    const isPasswordCorrect = await bcrypt.compare(
      decryptedPassword,
      customer.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid Credientials' });
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
      const keysToDelete = ['password', 'verificationCode', 'isAdmin', '__v'];
      keysToDelete.forEach((key) => {
        delete customer._doc[key];
      });

      if (responseMail) {
        return res.status(200).json({
          message: 'Email verificationCode has been sent to your email.',
          user: { ...customer._doc },
        });
      } else {
        return res
          .status(500)
          .json({ message: 'Email verification code sending failed.' });
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
    const keysToDelete = ['password', 'verificationCode', 'isAdmin', '__v'];
    keysToDelete.forEach((key) => {
      delete customer._doc[key];
    });
    res
      .status(200)
      .json({ message: 'Login successful', token, user: customer._doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const verificationCode = generateVerificationCode();
    const decryptedPassword = decrypt(password);
    const newCustomer = new Customer({
      email,
      password: decryptedPassword,
      name,
      verificationCode,
      stripeAccountId: '',
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
        .json({ message: 'Email verification code sending failed.' });
    }
  } catch (error) {
    const validationError = JSON.parse(error.message);
    res.status(422).json({ message: validationError });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await Customer.findOne({ email, verificationCode: code });

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Error verifying email' });
  }
};
