const express = require('express');
const buyPropertiesController = require('../controllers/buyPropertiesController');
const buyFilteredDataController = require('../controllers/buyFilteredDataController');
const router = express.Router();

router.get('/buy/listings/popular', buyPropertiesController.popularListing);
router.get('/buy/listings/latest', buyPropertiesController.latestListing);
router.get(
  '/buy/listings/filterdata',
  buyFilteredDataController.buyfilteredListing,
);
router.get('/buy/listings/detail/:id', buyPropertiesController.getPropertyById);
module.exports = router;
