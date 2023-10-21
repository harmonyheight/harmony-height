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

module.exports = { uploadImages };
