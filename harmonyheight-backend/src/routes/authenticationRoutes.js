const express = require('express');
const { login, register, verifyEmail } = require('../controllers');
const { validate } = require('../validations/reqValidateMiddleware');
const {
  loginValidationRules,
  registerValidateRules,
  authenticateToken,
} = require('../validations/authValidationMiddleware');

const router = express.Router();

router.post('/login', loginValidationRules(), validate, login);
router.post('/register', registerValidateRules(), validate, register);
router.post('/emailverify', verifyEmail);
router.get('/account', authenticateToken, (req, res) => [
  res.send(`User ${req.customerId}`),
]);

module.exports = router;
