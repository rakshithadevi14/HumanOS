const express = require('express');
const { body } = require('express-validator');

const {
  getProfile,
  updateProfile,
} = require('../controllers/profileController');

const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const profileValidation = [
  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must be 100 characters or fewer'),

  body('age')
    .optional()
    .isInt({ min: 0, max: 150 })
    .withMessage('Age must be between 0 and 150'),

  body('gender')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Gender must be 50 characters or fewer'),

  body('occupation')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Occupation must be 100 characters or fewer'),

  body('location')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must be 100 characters or fewer'),

  body('bio')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must be 500 characters or fewer'),
];

router.get('/', requireAuth, getProfile);

router.put('/', requireAuth, profileValidation, updateProfile);

module.exports = router;