const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Store uploads in the 'public/uploads' directory
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload.array('images', 12); // 'images' is the field name for the file input, and 5 is the maximum number of files allowed.
