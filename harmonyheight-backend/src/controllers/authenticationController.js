// controllers/CustomerController.js
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, customer.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
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
    // Authentication successful
    res
      .status(200)
      .json({ message: 'Login successful', token, ...customer._doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const newCustomer = new Customer({
      email,
      password,
      name,
    });
    const savedCustomer = await newCustomer.save();
    delete savedCustomer._id.password;
    res.status(201).json({
      message: 'User account has been created successfully',
      customer: savedCustomer,
    });
  } catch (error) {
    const validationError = JSON.parse(error.message);
    res.status(422).json({ message: validationError });
  }
};
