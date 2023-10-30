const express = require('express');
const homeListingController = require('../controllers/homeListingController');
const router = express.Router();

router.get('/listings/latest', homeListingController.latestListing);
module.exports = router;
