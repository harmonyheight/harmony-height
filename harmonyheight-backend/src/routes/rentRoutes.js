const express = require('express');
const rentPropertiesController = require('../controllers/rentPropertiesController');
const router = express.Router();

router.get(
  '/rent/listings/popular',
  rentPropertiesController.rentPopularListing,
);
router.get('/rent/listings/latest', rentPropertiesController.rentLatestListing);

module.exports = router;
