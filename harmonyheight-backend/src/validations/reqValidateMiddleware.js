const { validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
  console.log('====================================');
  console.log(req);
  console.log('====================================');
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0]?.msg });
  }

  next();
};
