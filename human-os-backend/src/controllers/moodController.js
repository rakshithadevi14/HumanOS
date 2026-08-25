const { validationResult } = require('express-validator');

const Mood = require('../models/Mood');

async function createMood(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid mood data',
          details: errors.array(),
        },
      });
    }

    const { mood, note, recordedAt } = req.body;

    const moodEntry = await Mood.create({
      userId: req.user.userId,
      mood,
      note: note || '',
      recordedAt: recordedAt || new Date(),
    });

    return res.status(201).json({
      success: true,
      data: {
        mood: moodEntry,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getMoods(req, res, next) {
  try {
    const moods = await Mood.find({
      userId: req.user.userId,
    }).sort({
      recordedAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: {
        moods,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMood,
  getMoods,
};