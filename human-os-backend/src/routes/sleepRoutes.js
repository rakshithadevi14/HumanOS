const express = require('express');
const { body } = require('express-validator');

const {
  createSleep,
  getSleepEntries,
} = require('../controllers/sleepController');

const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const sleepValidation = [
  body('sleepDate')
    .isISO8601()
    .withMessage('sleepDate must be a valid date'),

  body('bedtime')
    .isISO8601()
    .withMessage('bedtime must be a valid date and time'),

  body('wakeTime')
    .isISO8601()
    .withMessage('wakeTime must be a valid date and time'),

  body('durationMinutes')
    .isInt({ min: 1, max: 1440 })
    .withMessage('durationMinutes must be between 1 and 1440'),

  body('quality')
    .optional()
    .isIn(['poor', 'fair', 'good', 'excellent'])
    .withMessage(
      'quality must be poor, fair, good, or excellent'
    ),
];

router.post('/', requireAuth, sleepValidation, createSleep);

router.get('/', requireAuth, getSleepEntries);

module.exports = router;