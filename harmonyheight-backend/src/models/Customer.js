const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensure email is stored in lowercase
    validate: {
      validator: function (value) {
        // Use a regular expression to validate email format
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  name: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Add your custom password validation logic here
        return value.length >= 6; // Example: Password must be at least 6 characters long
      },
      message: 'Password must be at least 6 characters long',
    },
  },
});

// Middleware to hash the password before saving
customerSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      // Hash the password with a salt factor of 10
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
