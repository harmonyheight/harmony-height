const express = require('express');
const addNewListingController = require('../controllers/addNewListingController');
const { validate } = require('../validations/reqValidateMiddleware');
const upload = require('../middlewares/imagesUploadMiddleware');
const router = express.Router();

// router.post('/listing/new', checkImagesValidateReq(), validate, uploadImages);
router.post('/listing/new', upload, addNewListingController.uploadImages);

module.exports = router;
