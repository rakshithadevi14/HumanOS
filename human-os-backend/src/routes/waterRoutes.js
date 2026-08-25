const express = require('express');
const { body } = require('express-validator');

const {
  createWaterEntry,
  getWaterEntries,
} = require('../controllers/waterController');

const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const waterValidation = [
  body('amountMl')
    .isInt({ min: 1, max: 10000 })
    .withMessage('amountMl must be between 1 and 10000'),

  body('recordedAt')
    .optional()
    .isISO8601()
    .withMessage('recordedAt must be a valid date'),
];

router.post('/water', requireAuth, waterValidation, createWaterEntry);

router.get('/water', requireAuth, getWaterEntries);

module.exports = router;