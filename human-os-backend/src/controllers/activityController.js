const { validationResult } = require('express-validator');

const Activity = require('../models/Activity');

async function createActivity(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid activity data',
          details: errors.array(),
        },
      });
    }

    const {
      type,
      durationMinutes,
      calories,
      recordedAt,
    } = req.body;

    const activity = await Activity.create({
      userId: req.user.userId,
      type,
      durationMinutes,
      calories: calories || 0,
      recordedAt: recordedAt || new Date(),
    });

    return res.status(201).json({
      success: true,
      data: {
        activity,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getActivities(req, res, next) {
  try {
    const activities = await Activity.find({
      userId: req.user.userId,
    }).sort({
      recordedAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: {
        activities,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createActivity,
  getActivities,
};