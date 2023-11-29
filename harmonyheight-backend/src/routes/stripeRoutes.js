// routes/stripe.js
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');
const {
  authenticateToken,
} = require('../validations/authValidationMiddleware');

router.get('/connect', authenticateToken, stripeController.connectStripe);
router.get('/oauth/callback', stripeController.stripeCallback);

module.exports = router;
