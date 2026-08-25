const express = require('express');
const { body } = require('express-validator');

const {
  createActivity,
  getActivities,
} = require('../controllers/activityController');

const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const activityValidation = [
  body('type')
    .isIn([
      'walking',
      'running',
      'cycling',
      'workout',
      'yoga',
      'swimming',
      'sports',
      'other',
    ])
    .withMessage('Invalid activity type'),

  body('durationMinutes')
    .isInt({ min: 1, max: 1440 })
    .withMessage('durationMinutes must be between 1 and 1440'),

  body('calories')
    .optional()
    .isFloat({ min: 0, max: 10000 })
    .withMessage('calories must be between 0 and 10000'),

  body('recordedAt')
    .optional()
    .isISO8601()
    .withMessage('recordedAt must be a valid date'),
];

router.post('/', requireAuth, activityValidation, createActivity);

router.get('/', requireAuth, getActivities);

module.exports = router;