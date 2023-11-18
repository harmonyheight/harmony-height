const express = require('express');
const rentPropertiesController = require('../controllers/rentPropertiesController');
const rentFilteredDataController = require('../controllers/rentFilteredDataController');
const router = express.Router();

router.get(
  '/rent/listings/popular',
  rentPropertiesController.rentPopularListing,
);
router.get('/rent/listings/latest', rentPropertiesController.rentLatestListing);
router.get(
  '/rent/listings/filterdata',
  rentFilteredDataController.rentfilteredListing,
);

module.exports = router;
