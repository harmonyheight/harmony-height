const fs = require('fs');
const path = require('path');
const Listings = require('../models/Listings');
const mongoose = require('mongoose');
const uploadImages = (req, res) => {
  // The uploaded files are available in req.files
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ message: 'No files uploaded in controller.' });
  }

  // Generate URLs for the uploaded files
  const imageUrls = req.files.map((file) => {
    return `${req.protocol}://${req.get(
      'host',
    )}/public/uploads/${file.filename.replace(/\s+/g, '-')}`;
  });

  // Handle the uploaded files as needed (e.g., save their information to a database).

  return res
    .status(200)
    .json({ message: 'Files uploaded successfully', images: imageUrls });
};

const deleteImage = (req, res) => {
  console.log(req.body);
  const { imageUrl } = req.body; // Assuming the URL is sent as a query parameter

  if (!imageUrl) {
    return res.status(400).json({ error: 'URL parameter is missing' });
  }

  try {
    // Parse the URL to extract the filename
    const parsedUrl = new URL(imageUrl);
    const filename = path.basename(parsedUrl.pathname);
    console.log('====================================');
    console.log(filename);
    console.log('====================================');
    // Construct the full path to the image
    const imagePath = path.join('public', 'uploads', filename); // Adjust the path as needed
    console.log('====================================');
    console.log(imagePath);
    console.log('====================================');

    // Check if the image file exists
    if (fs.existsSync(imagePath)) {
      // Delete the image
      fs.unlinkSync(imagePath);
      return res
        .status(200)
        .json({ message: `Image ${filename} has been deleted.` });
    } else {
      return res.status(404).json({ error: `Image ${filename} not found.` });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting image' });
  }
};
const addListing = async (req, res) => {
  try {
    // Create a new listing using the NewListing model
    const newListing = new Listings({
      state: req.body.state,
      city: req.body.city,
      bathrooms: req.body.bathrooms,
      area: req.body.area,
      spaces: req.body.spaces,
      bedrooms: req.body.bedrooms,
      type: req.body.type,
      lease: req.body.lease,
      leasePeroid: req.body.leasePeroid,
      parking: req.body.parking,
      water: req.body.water,
      electricity: req.body.electricity,
      wifi: req.body.wifi,
      oldYear: req.body.oldYear,
      zipcode: req.body.zipcode,
      user: new mongoose.Types.ObjectId(req.customerId), // Convert user to ObjectId
      images: req.body.images,
    });
    // // Validate and save the new listing to the database
    await newListing.validate();
    const savedListing = await newListing.save();
    // Populate the user data (username and email)
    const populatedListing = await Listings.findById(savedListing._id)
      .populate('user', 'name email')
      .exec();

    // Respond with the saved listing data
    res.status(201).json({
      message: 'Listing successfully added',
      listing: populatedListing,
    });
  } catch (error) {
    // Handle validation errors or other errors
    res.status(400).json({ error: error.message });
  }
};
module.exports = { uploadImages, deleteImage, addListing };
