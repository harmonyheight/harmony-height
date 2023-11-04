const express = require('express');
const buyPropertiesController = require('../controllers/buyPropertiesController');
const router = express.Router();

router.get('/buy/listings/popular', buyPropertiesController.popularListing);
module.exports = router;
