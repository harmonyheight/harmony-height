const Customer = require('../models/Customer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const connectStripe = async (req, res) => {
  try {
    // Create a Connect account for the user
    const account = await stripe.accounts.create({
      type: 'express',
    });
    // Update the user's document with the Stripe account ID
    await Customer.findByIdAndUpdate(
      { _id: req.customerId },
      {
        stripeAccountId: account.id,
      },
    );

    // Create the account link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      type: 'account_onboarding',
      refresh_url: 'http://localhost:3000/profile', // Replace with your refresh URL
      return_url: 'http://localhost:3000/profile', // Replace with your return URL
    });

    res.json({ accountLink: accountLink.url });
  } catch (error) {
    console.error('Error connecting Stripe account:', error.message);
    res.status(500).json({ error: 'Error connecting Stripe account' });
  }
};

const stripeCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    const connectedAccountId = response.stripe_user_id;
    const user = await Customer.findOneAndUpdate({
      _id: req.customerId,
      stripeAccountId: connectedAccountId,
    });

    res.json({ message: 'Stripe account connected successfully', user });
  } catch (error) {
    console.error('Error connecting Stripe account:', error.message);
    res.status(500).json({ error: 'Error connecting Stripe account' });
  }
};

module.exports = { connectStripe, stripeCallback };
