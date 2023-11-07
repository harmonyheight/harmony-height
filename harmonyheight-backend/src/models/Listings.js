const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  city: String,
  bathrooms: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => Number.isInteger(value) && value > 0,
      message: 'Please enter a valid bathrooms value',
    },
  },
  area: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => Number.isInteger(value) && value > 0,
      message: 'Please enter a valid area value',
    },
  },
  spaces: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => Number.isInteger(value) && value > 0,
      message: 'Please enter a valid spaces value',
    },
  },
  bedrooms: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => Number.isInteger(value) && value > 0,
      message: 'Please enter a valid bedrooms value',
    },
  },
  type: {
    type: String,
    required: true,
  },
  lease: Boolean,
  leasePeroid: String,
  parking: Boolean,
  water: Boolean,
  electricity: Boolean,
  wifi: Boolean,
  oldYear: {
    type: Number,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  images: [
    {
      type: String,
      validate: {
        validator: (value) =>
          value.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i),
        message: 'Invalid image URL format',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Listings = mongoose.model('Listings', listingSchema);

module.exports = Listings;
