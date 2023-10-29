const express = require('express');
const addNewListingController = require('../controllers/addNewListingController');
const { validate } = require('../validations/reqValidateMiddleware');
const upload = require('../middlewares/imagesUploadMiddleware');
const {
  authenticateToken,
} = require('../validations/authValidationMiddleware');
const router = express.Router();

// router.post('/listing/new', checkImagesValidateReq(), validate, uploadImages);
router.post('/listing/new', upload, addNewListingController.uploadImages);
router.post('/delete-image', addNewListingController.deleteImage);
router.post(
  '/create-listing',
  authenticateToken,
  addNewListingController.addListing,
);

router.get(
  '/user-listings',
  authenticateToken,
  addNewListingController.getUserListingsController,
);

router.post(
  '/listings/deletebyid',
  authenticateToken,
  addNewListingController.deleteUserListingById,
);
module.exports = router;
