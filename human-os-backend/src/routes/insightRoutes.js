const express = require('express');

const {
  getInsights,
} = require('../controllers/insightController');

const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, getInsights);

module.exports = router;