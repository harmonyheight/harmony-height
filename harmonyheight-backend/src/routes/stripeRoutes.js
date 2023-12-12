// routes/stripe.js
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const {
  authenticateToken,
} = require('../validations/authValidationMiddleware');

router.get('/connect', authenticateToken, stripeController.connectStripe);
router.get(
  '/stripestatus',
  authenticateToken,
  stripeController.checkIncompleteSetup,
);
router.get(
  '/stripeaccountlink',
  authenticateToken,
  stripeController.generateStripeSetupLink,
);
//'/create-checkout-session'
router.post(
  '/create-checkout-session',
  authenticateToken,
  stripeController.createCheckoutSession,
);
// get balance

router.get(
  '/get-account-balance',
  authenticateToken,
  stripeController.getAccountBalance,
);

// get balance
router.get(
  '/get-account-payouts',
  authenticateToken,
  stripeController.getAccountPayouts,
);

// transactions
router.get(
  '/get-account-transactions',
  authenticateToken,
  stripeController.getAccountBalanceTransactions,
);

//refund a payment
router.post(
  '/process-refund',
  authenticateToken,
  stripeController.refundPayment,
);

//get account payment_intents
router.get(
  '/receiver-payments',
  authenticateToken,
  stripeController.getAccountPaymentsIntents,
);

const endpointSecret =
  'whsec_e1d6d18bfefd28c573b5fba6395990df1599ec4a16e21a9c55fff188918fbbe8';

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = stripe.webhooks.generateTestHeaderString({
      payload: JSON.stringify(request.body),
      secret: endpointSecret,
    });
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        JSON.stringify(request.body),
        sig,
        endpointSecret,
      );
      switch (event.type) {
        case 'checkout.session.completed':
          const checkoutSessionAsyncCompleted = event.data.object;
          console.log('====================================');
          console.log(checkoutSessionAsyncCompleted);
          console.log('====================================');
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      response.send();
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  },
);

module.exports = router;
