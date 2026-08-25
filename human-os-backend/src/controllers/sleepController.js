const { validationResult } = require('express-validator');

const Sleep = require('../models/Sleep');

async function createSleep(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid sleep data',
          details: errors.array(),
        },
      });
    }

    const {
      sleepDate,
      bedtime,
      wakeTime,
      durationMinutes,
      quality,
    } = req.body;

    const sleepEntry = await Sleep.create({
      userId: req.user.userId,
      sleepDate,
      bedtime,
      wakeTime,
      durationMinutes,
      quality: quality || 'good',
    });

    return res.status(201).json({
      success: true,
      data: {
        sleep: sleepEntry,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getSleepEntries(req, res, next) {
  try {
    const sleepEntries = await Sleep.find({
      userId: req.user.userId,
    }).sort({
      sleepDate: -1,
    });

    return res.status(200).json({
      success: true,
      data: {
        sleep: sleepEntries,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSleep,
  getSleepEntries,
};