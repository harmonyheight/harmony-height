// middleware/validationMiddleware.js
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
exports.loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ];
};
exports.checkEmailExists = async (email) => {
  const customer = await Customer.findOne({ email });

  if (customer) {
    throw new Error('Email already exists');
  }
  return true;
};

exports.registerValidateRules = () => {
  return [
    body('name')
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('Enter valid name'),
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .custom(async (email) => {
        await this.checkEmailExists(email);
      }),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ];
};

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    console.log(decodedToken);
    req.customerId = decodedToken.customerId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Token has expired' });
    }
    console.log(error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
