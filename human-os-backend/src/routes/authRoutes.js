const express = require('express');
const { body } = require('express-validator');

const {
  register,
  login,
  getCurrentUser,
} = require('../controllers/authController');

const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('A valid email address is required'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must be 100 characters or fewer'),
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('A valid email address is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login);

router.get('/me', requireAuth, getCurrentUser);

module.exports = router;