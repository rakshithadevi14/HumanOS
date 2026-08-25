const express = require('express');
const { body } = require('express-validator');

const {
  createMood,
  getMoods,
} = require('../controllers/moodController');

const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const moodValidation = [
  body('mood')
    .isIn([
      'happy',
      'calm',
      'neutral',
      'sad',
      'angry',
      'anxious',
      'excited',
      'tired',
    ])
    .withMessage('Invalid mood value'),

  body('note')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Note must be 500 characters or fewer'),

  body('recordedAt')
    .optional()
    .isISO8601()
    .withMessage('recordedAt must be a valid date'),
];

router.post('/mood', requireAuth, moodValidation, createMood);

router.get('/mood', requireAuth, getMoods);

module.exports = router;