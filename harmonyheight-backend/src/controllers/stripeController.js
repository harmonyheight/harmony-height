const Customer = require('../models/Customer');
const Listings = require('../models/Listings');
const Order = require('../models/Order');

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
      refresh_url: 'http://harmonyheightsresidences.com/profile', // Replace with your refresh URL
      return_url: 'http://harmonyheightsresidences.com/profile', // Replace with your return URL
    });
    //http://harmonyheightsresidences.com/
    res.json({ accountLink: accountLink.url, stripeAccountId: account.id });
  } catch (error) {
    console.error('Error connecting Stripe account:', error.message);
    res.status(500).json({ error: 'Error connecting Stripe account' });
  }
};

const checkIncompleteSetup = async (req, res) => {
  try {
    // Assuming you have a field in your database to track the Stripe account ID
    const { stripeAccountId } = await Customer.findById(req.customerId);
    // Retrieve account information to check onboarding status
    if (!stripeAccountId) {
      return res.json({
        stripeProfileComplete: false,
        message: 'Stripe account not connected',
      });
    }
    const accountInfo = await stripe.accounts.retrieve(stripeAccountId);
    if (
      accountInfo.requirements.currently_due.length > 0 ||
      accountInfo.requirements.pending_verification.length > 0
    ) {
      // Incomplete onboarding
      return res.json({
        stripeProfileComplete: false,
        message: 'Stripe account setup is incomplete',
      });
    } else {
      // Complete onboarding
      await Customer.findByIdAndUpdate(
        { _id: req.customerId },
        {
          stripeProfileComplete: true,
        },
      );
      return res.json({
        stripeProfileComplete: true,
        message: 'Stripe account setup is complete',
      });
    }
  } catch (error) {
    console.error('Error checking incomplete setup:', error.message);
    res.status(500).json({ error: 'Error checking incomplete setup' });
  }
};

const generateStripeSetupLink = async (req, res) => {
  try {
    // Assuming you have a field in your database to track the Stripe account ID
    const { stripeAccountId } = await Customer.findById(req.customerId);
    // Incomplete onboarding
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      type: 'account_onboarding',
      refresh_url: 'http://harmonyheightsresidences.com/profile', // Replace with your refresh URL
      return_url: 'http://harmonyheightsresidences.com/profile', // Replace with your return URL
    });
    return res.json({
      message: 'Stripe account setup is incomplete',
      accountLink: accountLink.url,
    });
  } catch (error) {
    console.error('Error checking incomplete setup:', error.message);
    res.status(500).json({ error: 'Error checking incomplete setup' });
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const { listingId, sellerId } = req.body; // Assuming you pass the listing ID and seller ID in the request body
    // Fetch the listing and seller details
    const listing = await Listings.findById(listingId).populate(
      'user',
      'stripeAccountId',
    );
    const seller = await Customer.findById(sellerId);

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: listing.state, // Modify this according to your product data
              images: [listing.images[0]],
            },
            unit_amount: listing.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        // application_fee_amount: calculateApplicationFee(listing.price), // Set the application fee amount
        transfer_data: {
          destination: seller.stripeAccountId, // Seller's Stripe account ID
        },
      },
      mode: 'payment',
      success_url: 'http://harmonyheightsresidences.com', // Replace with your success URL
      cancel_url: 'http://harmonyheightsresidences.com', // Replace with your cancel URL
      metadata: {
        buyer: req.customerId,
        seller: sellerId,
        listing: listingId,
        status: 'created',
      },
    });
    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
};

module.exports = {
  connectStripe,
  createCheckoutSession,
  checkIncompleteSetup,
  generateStripeSetupLink,
};
