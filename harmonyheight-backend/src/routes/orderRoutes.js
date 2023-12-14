const express = require('express');
const {
  authenticateToken,
} = require('../validations/authValidationMiddleware');
const { getAllSoldListingOrders } = require('../controllers/orderController');
const router = express.Router();

router.get('/orders/sold', authenticateToken, getAllSoldListingOrders);
module.exports = router;
