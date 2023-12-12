const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listings',
      required: true,
    },
    amount_total: {
      type: Number,
    },
    paymentIntent: {
      type: String, // Assuming you store the Stripe payment intent ID
      required: true,
    },
    status: {
      type: String,
      enum: ['created', 'processing', 'completed', 'canceled'],
      default: 'created',
    },
    payment_status: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
